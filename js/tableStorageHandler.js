// Función que permite guardar los visitantes en el localStorage y mostrarlos en una tabla, sin necesidad de recargar la página.
function saveVisitor(visitor) {
    const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    visitors.push(visitor);
    localStorage.setItem("visitors", JSON.stringify(visitors));
    addRow(visitor);
  }
  
  // Display saved visitors on page load
  function showVisitors() {
    const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    visitors.forEach(addRow);
  }
  
  // Add a row to the table
  function addRow(visitor) {
    const tbody = document.getElementById("visitorListBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${visitor.cedula}</td>
      <td>${visitor.nombre}</td>
      <td>${visitor.apellido}</td>
      <td>${visitor.departamento}</td>
      <td>${visitor.motivo}</td>
      <td>${visitor.fecha}</td>
    `;
  
    tbody.appendChild(row);
}