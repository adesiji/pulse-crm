import React, { useState } from "react";
import { Button } from "../../components/ui/Button.jsx";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

/**
 * LeadForm — YOURS TO BUILD.
 *
 * A controlled form: every input's value comes FROM state, and every
 * keystroke updates that state via onChange. This is different from an
 * "uncontrolled" form where the DOM holds the value and you only read it
 * on submit — controlled forms are the norm in React because it lets you
 * validate, format, and disable fields as the user types.
 *
 * STAGE: 3-4 (local state, forms), with a Stage 6 tie-in for the actual
 * submit (an API call).
 *
 * TODO:
 * // 1. useState for the form fields: { name, company, email, value }
 * //    (a single object is usually nicer than 4 separate useState
 * //    calls for a form — try it and see if you agree)
 * // 2. A generic handleChange(e) that updates the right field via
 * //    computed property name: setForm(f => ({ ...f, [e.target.name]:
 * //    e.target.value }))
 * // 3. Basic validation: name/company/email required, value must be a
 * //    positive number. Show errors under each field using the
 * //    `.field-error` class already defined in global.css.
 * // 4. handleSubmit: preventDefault(), validate, then call
 * //    api.createLead(form). Track an isSubmitting state so the button
 * //    disables and shows "Saving…" while the (fake) network call is in
 * //    flight.
 * // 5. On success, call the `onSuccess` prop (already wired by
 * //    LeadsPage to close the modal) — and see the TODO in LeadsPage
 * //    about how the new lead should reach the list.
 * // 6. On failure (api.js randomly throws ~5% of the time), show an
 * //    error message instead of crashing the form — don't lose what
 * //    the user typed.
 *
 * HINTS:
 * - `<input value={x} onChange={...} />` without an onChange makes React
 *   warn about a "read-only" field — if you see that warning, you
 *   forgot to wire onChange for that input.
 * - Number inputs still give you a STRING in e.target.value — convert
 *   with Number(...) before validating/sending.
 *
 * COMMON MISTAKES:
 * - Not calling e.preventDefault() — the browser will do a full page
 *   navigation on submit, wiping your state.
 * - Validating only on submit and never clearing an error once the user
 *   fixes the field.
 *
 * QUESTIONS TO THINK ABOUT:
 * - Should validation errors be their own piece of state, or derived
 *   from `form` every render? What would each approach cost you?
 */
export function LeadForm({ onSuccess }) {
  // TODO: replace with real form state, see above
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    value: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Validation logic
  const validateForm = () => {
    const tempErrors = {};

    if (!form.name.trim()) tempErrors.name = "Name is required.";
    if (!form.company.trim()) tempErrors.company = "Company is required.";
    if (!form.email.trim()) tempErrors.email = "Email is required.";

    // Check if empty, if it is a number, and if it is positive
    const numericValue = Number(form.value);
    if (!form.value.trim()) {
      tempErrors.value = "Value is required.";
    } else if (isNaN(numericValue) || numericValue <= 0) {
      tempErrors.value = "Value must be a positive number.";
    }

    setErrors(tempErrors);

    // Form is valid if the errors object has no keys
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: validate, call api.createLead, handle loading/error, call onSuccess()
    if (!validateForm()) return;
    //console.warn("LeadForm submit is not implemented yet");
    try {
      setIsSubmitting(true);

      // api.createLead returns the created lead directly (with id,
      // status, and createdAt assigned by the mock server).
      // Send `value` as a number (the mock data uses numeric values).
      const createdLead = await api.createLead({
        ...form,
        value: Number(form.value),
      });

      if (onSuccess) {
        onSuccess(createdLead);
      }
      showToast("Lead created successfully", "success");
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error.message || "Failed to create lead. Please try again."
      );
      showToast(error.message || "Failed to create lead", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="lead-name">Name</label>
        <input
          id="lead-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      <div className="field">
        <label htmlFor="lead-company">Company</label>
        <input
          id="lead-company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {errors.company && <div className="field-error">{errors.company}</div>}
      </div>
      <div className="field">
        <label htmlFor="lead-email">Email</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      <div className="field">
        <label htmlFor="lead-value">Deal value (NGN)</label>
        <input
          id="lead-value"
          name="value"
          type="number"
          min="0"
          value={form.value}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {errors.value && <div className="field-error">{errors.value}</div>}
      </div>
      {submitError && (
        <div className="field-error" role="alert">
          {submitError}
        </div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving" : "Create lead"}
      </Button>
    </form>
  );
}
