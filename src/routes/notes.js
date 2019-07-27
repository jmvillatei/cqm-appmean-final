const router = require("express").Router();

const Note = require('../models/Note');

router.get('/notes/add', function(req,res){
    res.render('notes/newnote');
});

router.post('/notes/newnote', async function(req,res){
    const { title , description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please write a Title'});
    }
    if(!description){
        errors.push({text: 'Please write a Desscription'});
    }
    if(errors.length > 0){
        res.render('notes/newnote', {
            errors,
            title,
            descrption
        });
    } else {
        const newNote = new Note({title, description});
        await newNote.save();
        req.flash('success_msg', 'Successfully operation, your note was added');
        res.redirect('/notes');
    }
});

router.get('/notes/', async function(req,res){
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/allnotes', {notes});
});


router.get('/notes/edit/:id', async function(req,res){
    const note = await Note.findById(req.params.id)
    res.render('notes/editnote', {note});
});

router.put('/notes/editnote/:id', async function(req,res){
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    req.flash('success_msg', 'Successfully operation, your note was update ');
    res.redirect('/notes');
});

router.delete('/notes/deletenote/:id', async function(req,res){
   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Successfully operation, your note was remove');
   res.redirect('/notes');
});

module.exports = router;