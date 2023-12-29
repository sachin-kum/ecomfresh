const express = require("express");
const {
  register,
  getAllUser,
  Login,
  Logout,
  forgotPassword,
  forgotPasswords,
  getUserDetails,
  getUserDetailsParms,
  updatePassword,
  userProfileUpdate,
  userRoleUpdate,
  deleteUser,
} = require("../conrollers/userControllers");
const router = express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../middleware/fileupload");

router.route("/register").post(upload.single("image"), register);
router.route("/get-user").post(getAllUser);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/forg").post(forgotPassword);
router.route("/forg1").post(forgotPasswords);

router.route("/get-profile").post(getUserDetails);
router.route("/update-password").post(isAuthUser, updatePassword);
router
  .route("/update-user-profile")
  .post(upload.single("image"), isAuthUser, userProfileUpdate);
router.route("/update-role").post(isAuthUser, authorizeRoles, userRoleUpdate);
router.route("/admin/delete-user").post(isAuthUser, authorizeRoles, deleteUser);

router.post("file", (req, res) => {
  // console.log("====================================");
  // console.log(req.file);
  // console.log("====================================");
});

module.exports = router;
