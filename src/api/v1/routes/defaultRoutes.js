import express from 'express'; 
const Router = express.Router();

Router.get(async (req, res) => {
    res.status(404);
    res.send({'msg':'Requested URL is not served yet!'})
});

export default Router;