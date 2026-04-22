import UserModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isUserAlreadyExists = await UserModel.findOne({ email });
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "A user with this email id already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    });

    return res.status(201).json({
        user: {
            name: user.name,
            email: user.email,
            _id: user._id
        },
        message: "User created successfully"
    })
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isUserExits = await UserModel.findOne({ email });
    if(!isUserExits){
        return res.status(400).json({
            message: "A user with this email id does not exist"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExits.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const token = jwt.sign({ id: isUserExits._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    });

    return res.status(200).json({
        message: `Welcome back ${isUserExits.name}`,
        user: {
            name: isUserExits.name,
            email: isUserExits.email,
            _id: isUserExits._id
        }
    })
}

export const logout = async (req, res) => {
    res.cookie('token', {
        httpOnly: true,
        expiresIn: 0
    }).clearCookie('token');

    return res.status(200).json({
        message: "logout successfull"
    })
}

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        
        if(!token) return;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded.id).select(" name email profilePic ");

        if(!user) return;

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong ${error}`
        })
    }
}