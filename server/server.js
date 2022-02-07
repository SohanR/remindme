require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// configuration of apparent
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

