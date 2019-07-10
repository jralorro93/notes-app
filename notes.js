const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('New note addded!')
    } else {
        console.log('Note is taken!')
    }

    
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString() 
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)
    
    if (notes.length > newNotes.length ) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(newNotes)
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your notes...'))
    loadedNotes = notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find(note => note.title === title)
    
    if (findNote) {
        console.log(chalk.green.inverse(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNote
}