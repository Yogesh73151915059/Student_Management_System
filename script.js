const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  const studentForm = document.getElementById('studentForm');
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const gradeInput = document.getElementById('grade');
  const degreeInput = document.getElementById('degree');
  const emailInput = document.getElementById('email');
  const submitButton = document.getElementById('submitButton');
  const searchBox = document.getElementById('searchBox');
  const studentTableBody = document.getElementById('studentTableBody');
  
  let editingStudentId = null;
  
  function renderStudents() {
    studentTableBody.innerHTML = '';
  
    for (const student of students) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td class="actions">
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
  
      const editButton = row.querySelector('.editButton');
      editButton.addEventListener('click', handleEditButtonClick);
  
      const deleteButton = row.querySelector('.deleteButton');
      deleteButton.addEventListener('click', handleDeleteButtonClick);
  
      studentTableBody.appendChild(row);
    }
  }
  
  function handleEditButtonClick(event) {
    const studentId = Number(event.target.dataset.id);
    const student = students.find(s => s.ID === studentId);
  
    if (student) {
      editingStudentId = student.ID;
      nameInput.value = student.name;
      ageInput.value = student.age;
      gradeInput.value = student.grade;
      degreeInput.value = student.degree;
      emailInput.value = student.email;
      submitButton.textContent = 'Edit Student';
    }
  }
  
  function handleDeleteButtonClick(event) {
    const studentId = Number(event.target.dataset.id);
    const studentIndex = students.findIndex(s => s.ID === studentId);
  
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudents();
    }
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const name = nameInput.value;
    const age = Number(ageInput.value);
    const grade = gradeInput.value;
    const degree = degreeInput.value;
    const email = emailInput.value;
  
    if (editingStudentId !== null) {
      const student = students.find(s => s.ID === editingStudentId);
  
      if (student) {
        student.name = name;
        student.age = age;
        student.grade = grade;
        student.degree = degree;
        student.email = email;
        editingStudentId = null;
        submitButton.textContent = 'Add Student';
      }
    } else {
      const newStudent = {
        ID: students.length + 1,
        name,
        age,
        grade,
        degree,
        email
      };
  
      students.push(newStudent);
    }
  
    studentForm.reset();
    renderStudents();
  }
  
  function handleSearchBoxInput() {
    const searchText = searchBox.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
  
    renderFilteredStudents(filteredStudents);
  }
  
  function renderFilteredStudents(filteredStudents) {
    studentTableBody.innerHTML = '';
  
    for (const student of filteredStudents) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td class="actions">
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
  
      const editButton = row.querySelector('.editButton');
      editButton.addEventListener('click', handleEditButtonClick);
  
      const deleteButton = row.querySelector('.deleteButton');
      deleteButton.addEventListener('click', handleDeleteButtonClick);
  
      studentTableBody.appendChild(row);
    }
  }
  
  studentForm.addEventListener('submit', handleFormSubmit);
  searchBox.addEventListener('input', handleSearchBoxInput);
  
  renderStudents();