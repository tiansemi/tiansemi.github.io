(() => {
  const form = document.querySelector("[data-club-join-form]");

  if (!form) return;

  const submit = form.querySelector("[data-club-join-submit]");
  const status = form.querySelector("[data-club-join-status]");

  const messages = {
    validation: "Merci de remplir correctement les champs obligatoires avant l’envoi.",
    sending: "Envoi de la demande d’adhésion…",
    success: "Demande envoyée. Merci pour votre intérêt, le bureau TianSemi vous recontactera.",
    error: "La demande n’a pas pu être envoyée. Réessayez ou contactez le club par e-mail."
  };

  const setStatus = (message, state = "") => {
    if (!status) return;
    status.textContent = message;
    status.className = `club-form-status${state ? ` is-${state}` : ""}`;
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

      if (!response.ok) throw new Error("Club join request failed");

      form.reset();
      form.classList.remove("was-validated");
      setStatus(messages.success, "success");
    } catch (error) {
      setStatus(messages.error, "error");
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Envoyer ma demande";
      }
    }
  });
})();
