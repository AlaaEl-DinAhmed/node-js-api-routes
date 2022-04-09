import { v4 as uuidv4 } from 'uuid';
import HttpError from "../models/http-error.js";

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Alaa',
        email: 'test@test.com',
        password: 'test123'
    }
];

const getUsers = (req, res, next) => {
    res.status(200).json({ DUMMY_USERS });
}

const signUp = (req, res, next) => {
    const { email, password } = req.body;
    const createdUser = { id: uuidv4(),email, password };
    const hasUser = DUMMY_USERS.find(user => user.email === email);
    if (hasUser) {
        throw new HttpError(422, 'Email already exists.');
    }
    DUMMY_USERS.push(createdUser);
    res.status(201).json({ users: DUMMY_USERS });
}

const logIn = (req, res, next) => {
    const { email, password } = req.body;
    const user = DUMMY_USERS.find(user => user.email === email && user.password === password);
    if (!user) {
        throw new HttpError(401, 'Invalid credentials.');
    }
    res.json({ msg: 'success',user });
}

export { getUsers, signUp, logIn };
