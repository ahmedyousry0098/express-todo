import mongoose, {Schema} from 'mongoose'
import { genSalt, hash } from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const UserModel = mongoose.model('User', userSchema)

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
		const salt = await genSalt(Number(process.env.SALT_ROUNDS));
		this.password = await hash(this.password, salt);
	}
	next();
})