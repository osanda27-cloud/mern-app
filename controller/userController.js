import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        // Correcting the creation of new user
        const newUser = new User(req.body);  // Use req.body instead of req.body directly in the constructor
        const { email } = newUser;
       // Check if the user with the same email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }
        const savedData = await newUser.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
export const getAllUsers = async(req,res)=>{
    try{
        const userData = await User.find();
        if (!userData || userData.length===0){
            return res.status(404).json({message :"User data not found."});
        }
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({ errorMessage: error.message });
   }
};
export const getUserById = async(req,res) =>{
    try{
         const id = req.params.id;
         const userExist = await User.findById(id);
         if(!userExist){
            return res.status(404).json({message :"User not found."});
         }
         res.status(200).json(userExist)

    }   catch(error){
        res.status(500).json({errorMessage: error.message});
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message :"User not found."});
         }
        const updatedData = await User.findByIdAndUpdate(id, req.body,{
            new:true
         })
         res.status(200).json(updatedData);

    }catch (error){
        res.status(500).json({ errorMessage: error.message});
    }
};
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the user exists
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(id);

        // Respond with success
        res.status(200).json({ message: "User deleted successfully." }); // Use 200 or 204 for success
    } catch (error) {
        // Handle any errors during the deletion process
        res.status(500).json({ errorMessage: error.message });  // Ensure `error` is passed correctly
    }
};




