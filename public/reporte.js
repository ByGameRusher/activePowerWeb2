const db = firebase.firestore()
// const user = firebase.default.auth()
let dato = false
//tabla de mensajes
const reporteMsg = document.getElementById('reporte-mensajes')
let html = reporteMsg.innerHTML

db.collection('mensaje').onSnapshot(query => {
	html = html + '<tr>'
	query.docs.forEach(doc => {
		const datos = doc.data()
		html = html + `<tr><td>${doc.id}</td><td>${datos.msg}</td></tr>`
	})
	html = html + '</tr>'
	reporteMsg.innerHTML = html
})

//tabla de rutinas
const reporteRutinas = document.getElementById('reporte-rutina')
let html2 = reporteRutinas.innerHTML

db.collection('rutinaGratis').onSnapshot(query => {
	html = html + '<tr>'
	query.docs.forEach(doc => {
		const datos = doc.data()
		html2 =
			html2 +
			`<tr>
                <td><p>${doc.id}</p></td>
                <td><p>${datos.nombre}</p></td>
                <td><p>${datos.des}</p></td>
            </tr>`
	})
	html2 = html2 + '</tr>'
	reporteRutinas.innerHTML = html2
	dato = true
	reportes(true)
})

//hora
const hoy = new Date()
const hora = document.getElementById('hora')
hora.innerHTML = `${hoy.getDate()} - ${hoy.getMonth()} - ${hoy.getFullYear()} // ${hoy.getHours()} : ${hoy.getMinutes()} : ${hoy.getSeconds()}`

//creacion de pdf
var pdf = new jsPDF()
const reportes = dato => {
	if (dato) {
		html2canvas(document.querySelector('#capture'), {
			scale: 1,
			useCORS: true,
		}).then(canvas => {
			let img = canvas.toDataURL('image/png')
			pdf.setFont('Arial')
			pdf.addImage(img, 'PNG', 7, 13, 195, 105)
			pdf.save('reporte.pdf')
		})
	} else {
		console.log(dato)
	}
}
