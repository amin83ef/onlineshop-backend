import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'نام الزامی است'],
        },
        email: {
            type: String,
            required: [true, 'ایمیل الزامی است'],
        },
        password: {
            type: String,
            required: [true, 'رمزعبور الزامی است'],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema);
export default User;