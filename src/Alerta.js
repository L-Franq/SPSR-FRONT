import Swal from "sweetalert2";

export default function AlertaDosistema(icon = "", title = "", message = ""){
    Swal.fire({
            icon: icon,
            title: title,
            text: message,
            confirmButtonColor: '#0284C7'
        });
}