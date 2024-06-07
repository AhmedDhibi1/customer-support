const express = require("express");
const router = express.Router();
const roleControllers = require("../controllers/role.controllers");
const Permission = require('../models/permission');
router.post("/create", create);
router.get("/getAll", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/:roleId/permissions/:permissionId", addPermissionToRole);
router.get("/:roleId/permissions", getPermissionsOfRoleHandler);
router.delete("/:roleId/permissions/:permissionId", removePermissionFromRoleHandler);

module.exports = router;

async function create(req, res, next) {
  try {
    const role = await roleControllers.create(req.body);
    res.json({ role, message: "Role created successfully" });
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const roles = await roleControllers.getAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const role = await roleControllers.getById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await roleControllers.update(req.params.id, req.body);
    res.json({ message: `Role with id: ${req.params.id} updated successfully` });
  } catch (error) {
    next(error);
  }
}

async function _delete(req, res, next) {
  try {
    await roleControllers.remove(req.params.id);
    res.json({ message: `Role with id: ${req.params.id} deleted successfully` });
  } catch (error) {
    next(error);
  }
}

async function addPermissionToRole(req, res, next) {
  const roleId = req.params.roleId; // Corrected from req.params.id to req.params.roleId
  const permissionId = req.params.permissionId;

  try {
    await roleControllers.addPermissionToRole(roleId, permissionId);
    res.json({ message: "Permission added to role successfully" });
  } catch (error) {
    next(error);
  }
}

async function getPermissionsOfRoleHandler(req, res, next) {
  const roleId = req.params.roleId;
 
  try {
     const permissions = await roleControllers.getPermissionsOfRole(roleId);
     res.json(permissions);
  } catch (error) {
     next(error);
  }
 }

 async function removePermissionFromRoleHandler(req, res, next) {
  const roleId = req.params.roleId;
  const permissionId = req.params.permissionId;
 
  try {
     await roleControllers.removePermissionFromRole(roleId, permissionId);
     res.json({ message: "Permission removed from role successfully" });
  } catch (error) {
     next(error);
  }
 }
