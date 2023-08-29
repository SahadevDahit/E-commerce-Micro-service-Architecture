import exppress from "express";
import upload from "../config/multer.js";
import {
    signup,
    login,
    getUserProfile,
    getUserRole,
    getUserProfileOfSeller,
    updateUserProfile,
    updatePassword,
    getAllUsers,
    changePassword,
    updateProfileById,
    updateBusiness,
    getBusinessInfo,
    getUserProfileById
} from "../controllers/users.js";

const userRoutes = exppress.Router();
userRoutes.get("/getRole",getUserRole)
userRoutes.get("/users",getAllUsers)
userRoutes.post("/", upload.single("logo"), signup);
userRoutes.post("/login", login);
userRoutes.get("/profile", getUserProfile);
userRoutes.get("/:id", getUserProfileById);

userRoutes.get("/sellerProfile/:id", getUserProfileOfSeller);
userRoutes.get("/businessInfo/:id", getBusinessInfo);
//update user profile
userRoutes.put("/profile", updateUserProfile);
userRoutes.put("/update/:id", updateProfileById);
userRoutes.put("/updatePassword", updatePassword);
userRoutes.put("/changePassword", changePassword);
userRoutes.put("/updateBusiness", updateBusiness);
export default userRoutes;