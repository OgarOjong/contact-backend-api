const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const ObjectID = require("mongoose").Types.ObjectId;

//@desc get all the contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
	const contact = await Contact.find({ user_id: req.user.id });
	res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}
	const contact = await Contact.create({
		name,
		email,
		phone,
		user_id: req.user.id,
	});
	res.status(201).json(contact);
});

//@desc get a single  contact
//@route GET /api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	res.status(200).json(contact);
});

//@desc Update  a single  contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact || !ObjectID.isValid(req.params.id)) {
		res.status(404);
		throw new Error("Contact not found");
	}

	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User cannot update this contact");
	}

	const updateContact = await Contact.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json(updateContact);
});

//@desc Delete  a single  contact
//@route delete /api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact || !ObjectID.isValid(req.params.id)) {
		res.status(404);
		throw new Error("Contact not found");
	}
	try {
		if (contact.user_id.toString() !== req.user.id) {
			res.status(403);
			throw new Error("User cannot Delete this contact");
		}
		await Contact.findByIdAndDelete(req.params.id);
		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
		// Handle the error here
	}
});
module.exports = {
	getAllContacts,
	createContact,
	getContact,
	updateContact,
	deleteContact,
};
