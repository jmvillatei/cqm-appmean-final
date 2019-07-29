const router = require("express").Router();

const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, function (req, res) {
    res.render('notes/newnote');
});

router.post('/notes/newnote', isAuthenticated, async function (req, res) {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please write a Title' });
    }
    if (!description) {
        errors.push({ text: 'Please write a Desscription' });
    }
    if (errors.length > 0) {
        res.render('notes/newnote', {
            errors,
            title,
            descrption
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Successfully operation, your note was added');
        res.redirect('/notes');
    }
});

router.get('/notes/all', isAuthenticated, async function (req, res) {
    const notes = await Note.find().sort({ date: 'desc' });
    res.render('notes/allnotes', { notes });
});

router.get('/notes', isAuthenticated, async function (req, res) {
    const notes = await Note.find({user: req.user.id}).sort({ date: 'desc' });
    res.render('notes/allnotes', { notes });
});


router.get('/notes/edit/:id', isAuthenticated, async function (req, res) {
    const note = await Note.findById(req.params.id)
    res.render('notes/editnote', { note });
});

router.put('/notes/editnote/:id', isAuthenticated, async function (req, res) {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Successfully operation, your note was update ');
    res.redirect('/notes');
});

router.delete('/notes/deletenote/:id', isAuthenticated, async function (req, res) {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Successfully operation, your note was remove');
    res.redirect('/notes');
});

module.exports = router;