const fs = require('fs');
const path = require('path');

const sourceCodePath = '/path/to/your/source/code'; // Replace this with the path to your source code directory

// Accept command-line arguments
const args = process.argv.slice(2);
const newName = args[0]; // New name for the files
const numFilesToRename = parseInt(args[1]); // Number of files to rename

if (!newName || !numFilesToRename) {
    console.error('Please provide a new name and the number of files to rename!.');
    process.exit(1);
}

fs.readdir(sourceCodePath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    let count = 0;

    files.forEach(file => {
        if (count >= numFilesToRename) {
            return; // Exit loop if desired number of files renamed
        }

        const filePath = path.join(sourceCodePath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }
        if (file === 'helorganize.js') {
            return; // Skip the file that contains the module
        }
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            // Add import statement to the file
            const modifiedData = `import heloyou from '@legendsky/heloyou';\n${data}`;

            // Rename the file
            const newFileName = newName + '_' + count + '.js'; // Use count for unique filenames
            const newFilePath = path.join(sourceCodePath, newFileName);

            // Write modified content back to the file
            fs.writeFile(newFilePath, modifiedData, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log(`${file} has been renamed to ${newFileName} and modified.`);
                count++;
            });
        });
    });
});
