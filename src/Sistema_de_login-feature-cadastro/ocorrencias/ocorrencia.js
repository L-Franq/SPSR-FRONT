const API = { baseUrl: "", incidents: "/incidents" };
const DEMO = !API.baseUrl;
let recognition = null,
  listening = false;
function getGPS() {
  if (!navigator.geolocation) {
    Swal.fire({
      icon: "error",
      title: "GPS indisponível",
      text: "O navegador não suporta geolocalização.",
    });
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (p) => {
      document.getElementById("location").value =
        p.coords.latitude.toFixed(6) + ", " + p.coords.longitude.toFixed(6);
      Swal.fire({ icon: "success", title: "Localização obtida" });
    },
    () =>
      Swal.fire({
        icon: "warning",
        title: "Permissão não concedida",
        text: "Verifique as permissões de localização.",
      }),
    { enableHighAccuracy: true, timeout: 10000 },
  );
}
function toggleVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    Swal.fire({
      icon: "warning",
      title: "Voz não suportada",
      text: "Este navegador não suporta reconhecimento de voz. Escreva a descrição no campo.",
    });
    return;
  }
  if (listening) {
    recognition.stop();
    return;
  }
  recognition = new SR();
  recognition.lang = "pt-PT";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onstart = () => {
    listening = true;
    document.getElementById("voiceBtn").innerHTML =
      '<i class="fa-solid fa-stop"></i> Parar';
    document.getElementById("voiceStatus").textContent = "A ouvir...";
  };
  recognition.onresult = (e) => {
    const f = document.getElementById("description");
    f.value += (f.value.trim() ? " " : "") + e.results[0][0].transcript;
  };
  recognition.onerror = () =>
    (document.getElementById("voiceStatus").textContent =
      "Falha no reconhecimento. Verifique o microfone.");
  recognition.onend = () => {
    listening = false;
    document.getElementById("voiceBtn").innerHTML =
      '<i class="fa-solid fa-microphone"></i> Ditar descrição';
    document.getElementById("voiceStatus").textContent =
      "Ditado terminado. Reveja o texto.";
  };
  recognition.start();
}
document.getElementById.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  if (!f.reportValidity()) return;
  const data = Object.fromEntries(new FormData(f).entries());
  data.coordinates = data.location || null;
  delete data.location;
  data.createdAt = new Date().toISOString();
  const c = await Swal.fire({
    icon: "question",
    title: "Confirmar envio?",
    text: "Confirme que as informações estão correctas e que não se colocou em risco.",
    showCancelButton: true,
    confirmButtonText: "Enviar ocorrência",
    cancelButtonText: "Rever",
    confirmButtonColor: "#0284C7",
  });
  if (!c.isConfirmed) return;
  if (DEMO) {
    console.log("Payload para POST /incidents:", data);
    await Swal.fire({
      icon: "success",
      title: "Formulário validado",
      text: "Modo demonstração: configure API.baseUrl para activar o envio real.",
    });
    f.reset();
    return;
  }
  try {
    const r = await fetch(API.baseUrl + API.incidents, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw Error();
    await Swal.fire({
      icon: "success",
      title: "Ocorrência enviada",
      text: "A central recebeu o registo.",
    });
    f.reset();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Falha no envio",
      text: "Não foi possível contactar a central. Tente novamente mais tarde.",
    });
  }
});
