import bcrypt from "bcrypt";

export const hashString = async (value) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(value, salt);
};
