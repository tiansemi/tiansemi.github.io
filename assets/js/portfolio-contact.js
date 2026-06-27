(() => {
  const form = document.querySelector("[data-portfolio-contact-form]");

  if (!form) return;

  const submit = form.querySelector("[data-portfolio-contact-submit]");
  const status = form.querySelector("[data-portfolio-contact-status]");

  const messages = {
    idle: "",
    validation: "Merci de remplir correctement les champs obligatoires avant l’envoi.",
    sending: "Envoi en cours…",
    success: "Message envoyé. Merci, une réponse vous sera apportée dès que possible.",
    error: "Le message n’a pas pu être envoyé. Réessayez ou utilisez l’e-mail indiqué sur la page."
  };

  const setStatus = (message, state = "") => {
    if (!status) return;
    status.textContent = message;
    status.className = `portfolio-form-status${state ? ` is-${state}` : ""}`;
  };

  form.addEventListener(
    "invalid",
    () => {
      form.classList.add("was-validated");
      setStatus(messages.validation, "error");
    },
    true
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      setStatus(messages.validation, "error");
      form.reportValidity();
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = messages.sending;
    }
    setStatus(messages.sending);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Portfolio contact request failed");

      form.reset();
      form.classList.remove("was-validated");
      setStatus(messages.success, "success");
    } catch (error) {
      setStatus(messages.error, "error");
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Envoyer le message";
      }
    }
  });
})();
