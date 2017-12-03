import * as express from "express";


const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("shop/index", { title: "Express" });
});


export const indexRouter: express.Router = router;
