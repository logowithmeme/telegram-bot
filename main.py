def main():
    app = ApplicationBuilder().token(TOKEN).timezone(pytz.utc).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    print("✅ CODING NOTES Bot is running...")
    app.run_polling()
