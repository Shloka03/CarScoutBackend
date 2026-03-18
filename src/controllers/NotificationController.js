const Notification = require("../models/NotificationModel")

const createNotification = async(req,res)=>{
    try{

        const notification = await Notification.create(req.body)

        res.status(201).json({
            message:"Notification created",
            data:notification
        })

    }catch(err){
        res.status(500).json({
            message:"Error creating notification",
            err
        })
    }
}

const getAllNotifications = async(req,res)=>{
    try{

        const notifications = await Notification.find()

        res.status(200).json({
            message:"Notifications fetched",
            data:notifications
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching notifications",
            err
        })
    }
}

const markAsRead = async(req,res)=>{
    try{

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {isRead:true},
            {new:true}
        )

        res.status(200).json({
            message:"Notification marked as read",
            data:notification
        })

    }catch(err){
        res.status(500).json({
            message:"Error updating notification",
            err
        })
    }
}

module.exports = {
    createNotification,
    getAllNotifications,
    markAsRead
}