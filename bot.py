import nest_asyncio
nest_asyncio.apply()

import pytz
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, ChatInviteLink, ChatMemberUpdated
from telegram.ext import (ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters, ChatMemberHandler)
from datetime import datetime, timedelta

# === CONFIGURATION ===
TOKEN = '7889273190:AAGw2t8FCoLbVPsxRqy7ITtz-Kvb9JVPGsw'
ADMIN_ID = 8006671023
CHANNEL_ID = -1002644573835
PLAN_PRICE = 499
UPI_ID = "Q553984602@ybl"
QR_PATH = "C:/Users/jhade/TELBOT/qr.jpg"

pending_payments = {}
pending_support = set()
user_invite_links = {}  # user_id: invite_link_url

# === /start COMMAND ===
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("💰 Buy Now", callback_data="buy_plan")],
        [InlineKeyboardButton("👁️ View Demo", url="https://t.me/+xWDWNSrJpHA3NGY9")],
        [InlineKeyboardButton("🛠 Support", callback_data="support")]
    ]
    await update.message.reply_text(
        f"🎓 *CODING NOTES Membership Access*\n\n"
        f"👁️ Want to see what’s inside? Click *View Demo* below.\n\n"
        f"💵 *PRICE:*\n"
        f"━━━━━━━━━━━━━━━\n"
        f"🔥🔥🔥  *₹{PLAN_PRICE} ONLY*  🔥🔥🔥\n"
        f"━━━━━━━━━━━━━━━\n\n"
        f"📚 Get lifetime access to exclusive notes, projects, and more!",
        parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

# === BUTTON HANDLER ===
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    if query.data == "buy_plan":
        await query.message.reply_text("🔄 Generating your QR code...")
        try:
            with open(QR_PATH, "rb") as qr_img:
                await context.bot.send_photo(
                    chat_id=query.message.chat.id,
                    photo=qr_img,
                    caption=(
                        f"✅ Please pay *₹{PLAN_PRICE}* to this UPI ID:\n`{UPI_ID}`\n\n"
                        f"📸 After payment, send a screenshot here to continue."
                    ),
                    parse_mode="Markdown"
                )
            print("✅ Buy Now: QR sent successfully")
        except Exception as e:
            await query.message.reply_text("⚠️ Failed to send QR image. Please try again.")
            print(f"❌ Buy Now error: {e}")

    elif query.data == "support":
        pending_support.add(query.from_user.id)
        await query.message.reply_text("🛠 Please type your issue. Admin will help you shortly.")

    elif query.data.startswith("accept_"):
        user_id = int(query.data.split("_")[1])
        try:
            invite_link: ChatInviteLink = await context.bot.create_chat_invite_link(
                chat_id=CHANNEL_ID,
                expire_date=datetime.utcnow() + timedelta(minutes=5),
                member_limit=1,
                creates_join_request=False,
                name=f"Access for {user_id}"
            )
            user_invite_links[user_id] = invite_link.invite_link

            await context.bot.send_message(
                chat_id=user_id,
                text=(
                    "✅ *Payment Verified!*\n\n"
                    "💌 Welcome to *CODING NOTES* 📚\n"
                    "🎁 Here’s your private one-time join link:\n"
                    f"{invite_link.invite_link}\n\n"
                    "⚠️ Link expires after 1 use or 5 minutes.\n"
                    "🔍 If the link doesn’t work, search: *CODING NOTES*"
                ),
                parse_mode="Markdown"
            )

            await query.message.reply_text("✅ Access granted! User received 1-time link.")

        except Exception as e:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=f"❌ Failed to create invite link: {e}"
            )
            await query.message.reply_text("⚠️ Error while creating invite link. Please try again.")

    elif query.data.startswith("reject_"):
        user_id = int(query.data.split("_")[1])
        await context.bot.send_message(
            chat_id=user_id,
            text="❌ Sorry, your payment was not verified. Please try again or contact support."
        )
        await query.message.reply_text("❌ Payment rejected.")

# === HANDLE PAYMENT SCREENSHOTS ===
async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.message.from_user
    photo_file = update.message.photo[-1].file_id
    pending_payments[user.id] = photo_file
    keyboard = [
        [
            InlineKeyboardButton("✅ Accept", callback_data=f"accept_{user.id}"),
            InlineKeyboardButton("❌ Reject", callback_data=f"reject_{user.id}")
        ]
    ]
    await context.bot.send_photo(
        chat_id=ADMIN_ID,
        photo=photo_file,
        caption=f"📸 Payment screenshot from: @{user.username or user.first_name}\nUser ID: {user.id}",
        parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )
    await update.message.reply_text("📥 Screenshot received! Admin will review it shortly.")

# === HANDLE SUPPORT MESSAGE ===
async def handle_support_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id
    if user_id in pending_support:
        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=f"🆘 Support query from @{update.message.from_user.username or update.message.from_user.first_name} (ID: {user_id}):\n\n{update.message.text}"
        )
        await update.message.reply_text("✅ Support message sent to admin. Please wait for a reply.")
        pending_support.remove(user_id)

# === DETECT JOIN AND REVOKE INVITE LINK ===
async def handle_member_update(update: ChatMemberUpdated, context: ContextTypes.DEFAULT_TYPE):
    user = update.chat_member.new_chat_member.user
    if user.id in user_invite_links:
        invite_link = user_invite_links.pop(user.id)
        try:
            await context.bot.revoke_chat_invite_link(CHANNEL_ID, invite_link)
            print(f"🔒 Revoked invite link for user {user.id}")
        except Exception as e:
            print(f"⚠️ Error revoking invite link: {e}")

# === MAIN ===
async def main():
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_support_message))
    app.add_handler(ChatMemberHandler(handle_member_update, ChatMemberHandler.CHAT_MEMBER))
    print("✅ CODING NOTES Bot is running...")
    await app.run_polling()

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
