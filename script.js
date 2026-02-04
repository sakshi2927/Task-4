const form = document.getElementById("form");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btn-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.classList.remove("hidden");
  btnText.textContent = "Generating...";
  output.value = "";

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const skills = document.getElementById("skills").value;

  const res = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role, company, skills }),
  });

  const data = await res.json();
  output.value = data.result;

  spinner.classList.add("hidden");
  btnText.textContent = "Generate";
});

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
});
