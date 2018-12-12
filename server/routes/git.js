const express = require('express');
const router = express.Router();

router.get('/fetchGitHubData', function (req, res) {
    res.json([{
        id:1,
        sample:'check the sample data'
    }])
})

module.exports = router;
