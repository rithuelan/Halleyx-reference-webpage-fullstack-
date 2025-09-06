// DOM Elements
const form = document.getElementById("contactForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const inquiry = document.getElementById("inquiry-type");
const fetchBtn = document.getElementById("fetchDataBtn");
const dataList = document.getElementById("dataList");

// ✅ Real-Time Form Validation
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email.classList.toggle("is-invalid", !emailRegex.test(email.value));
};

const validatePassword = () => {
  password.classList.toggle("is-invalid", password.value.length < 6);
};

const validateInquiry = () => {
  inquiry.classList.toggle("is-invalid", inquiry.value === "");
};

email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
inquiry.addEventListener("change", validateInquiry);

// ✅ Form Submission Handling
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEmail();
  validatePassword();
  validateInquiry();

  if (!document.querySelector(".is-invalid")) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

// ✅ Fetch Data Asynchronously
fetchBtn.addEventListener("click", async () => {
  try {
    fetchBtn.disabled = true;
    fetchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';

    const response = await fetch("http://localhost:3000")
    const data = await response.json();

    dataList.innerHTML = "";
    data.forEach((item) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
      dataList.appendChild(li);
    });

    fetchBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Fetched!';
  } catch (error) {
    alert("Failed to fetch data!");
  } finally {
    setTimeout(() => {
      fetchBtn.disabled = false;
      fetchBtn.innerHTML = '<i class="fas fa-download me-2"></i>Fetch Data';
    }, 2000);
  }
});
