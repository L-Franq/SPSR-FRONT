const API = { baseUrl: "", advertisements: "/advertisements", visit: id => `/advertisements/${encodeURIComponent(id)}/visit` };
const DEMO = !API.baseUrl;
async function visit(id, name) {
    if (!DEMO) { try { const r = await fetch(API.baseUrl + API.visit(id), { method: "POST" }); if (!r.ok) throw Error() } catch (e) { Swal.fire({ icon: "error", title: "Não foi possível registar a visita" }); return } }
    Swal.fire({ icon: "info", title: name, text: "O endereço externo deste parceiro será fornecido pela API SRA. Este cartão é ilustrativo.", confirmButtonColor: "#0284C7" });
}