const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); 
// فك التعليق عن السطر أعلاه عند تفعيل الحماية

// --- إحصائيات لوحة التحكم (Dashboard Stats) ---
router.get('/stats', adminController.getDashboardStats);
router.get('/financials/summary', adminController.getFinancialSummary);
// --- إدارة المشاريع (Projects Management) ---
router.get('/projects', adminController.getAllProjects);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// --- إدارة المتبرعين والاشتراكات (Donors & Subscriptions) ---
router.get('/donors', adminController.getAllDonors);
router.get('/donations/recent', adminController.getRecentDonations);

// --- سجل الرقابة (Audit Logs) ---
router.get('/audit-logs', adminController.getAuditLogs);

// --- العملات (Currencies) ---
router.get('/currencies', adminController.getCurrencies);
router.put('/currencies/:code', adminController.updateExchangeRate);

module.exports = router;