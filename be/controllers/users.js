const { UserModel } = require('../schema/UserSchema')
const auth = require('../common/auth')
const { TokenModel } = require('../schema/TokenSchema')
// const sendMail = require('../sendEmail')
// const crypto = require('crypto')


const handleProfile = async (req, res, next) => {
  try {
    let user = await UserModel.updateOne({ _id: req.params.id }, {
      $set: { image: `${req.body.image}` }
    })
    res.status(200).send({
      message: "User Updated Successfully",
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}

const handleLogin = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    // if (!user.verified) {
    // let token = await TokenModel.findOne({ userId: user._id })
    // if (!token) {
    //   let token = await new TokenModel({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex")
    //   }).save()
    //   let url = `${BASE_URL}/users/${user._id}/verify/${token.token}`
    //   await sendMail(user.email, "Verify Email", url)
    // }
    // return res.status(400).send({ message: 'An Email sent To Your Account Pls Verify' })

    // }
    if (user) {
      console.log(await auth.hashCompare(req.body.password, user.password))
      if (await auth.hashCompare(req.body.password, user.password)) {
        let token = await auth.createToken({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          role: user.role
        })
        res.status(200).send({ message: "Login Successfull", token, userid: user._id, role: user.role, primeMember: user.primeMember, firstName: user.firstName, email: user.email })
      }
      else {
        res.status(400).send({ message: `Password Wrong` })
      }
    }
    else {
      res.status(400).send({ message: `User with ${req.body.email} does not exists` })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}


const handleSignup = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      req.body.password = await auth.hashPassword(req.body.password)
      let user = await UserModel.create(req.body)
      res.status(201).send({
        message: "User Created Successfully",
        user
      })

      // let token = await new TokenModel({
      //   userId: user._id,
      //   token: crypto.randomBytes(32).toString("hex")
      // }).save()
      // let url = `${BASE_URL}/users/${user._id}/verify/${token.token}`
      // await sendMail(user.email, "Verify Email", url)
      // res.status(201).send({
      //   message: "An Email sent to your account please verify"
      // })

    }
    else {
      res.status(400).send({ message: `User with ${req.body.email} already exists` })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}


const handleEmailVerify = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) return res.status(400).send({ message: "Invalid Link" })

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token
    })
    if (!token) return res.status(400).send({ message: "Invalid Link" })

    await UserModel.updateOne({ _id: user._id, verified: true })
    await token.remove()

    res.status(200).send({ message: "Email Verified Successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}


const handleGetUserDetails = async (req, res, next) => {
  try {
    let users = await UserModel.find()
    console.log(users, "hiiiiiiiiiii")
    res.status(200).send({ message: "Data Fetched Successfully", users })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}

const handleGetUser = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id })
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}

const handleUpdateUser = async (req, res, next) => {
  console.log("iiiiiiiiiiiiiiiiiii")
  try {
    let user = await UserModel.updateOne({ _id: req.params.id }, {
      $set: {
        firstName: `${req.body.firstName} `, lastName: `${req.body.lastName} `,
        email: `${req.body.email} `, mobile: `${req.body.mobile} `
      }
    })
    res.status(200).send({
      message: "User Updated Successfully",
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}

const handleDeleteUser = async (req, res, next) => {
  try {
    let use = await UserModel.findOne({ _id: req.params.id })
    console.log(use)
    let user = await UserModel.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: "User Deleted Succefully", user })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error", error })
  }
}

module.exports = {
  handleSignup, handleLogin, handleGetUserDetails, handleGetUser, handleUpdateUser,
  handleDeleteUser, handleProfile, handleEmailVerify
}