import { useState } from "react";
import {
  GoabOneColumnLayout,
  GoabMicrositeHeader,
  GoabAppHeader,
  GoabAppFooter,
  GoabPageBlock,
  GoabFormItem,
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabCheckbox,
  GoabButton,
  GoabButtonGroup,
  GoabCallout,
} from "@abgov/react-components";

type Errors = { name?: string; email?: string; program?: string };

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [contact, setContact] = useState("email");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const e: Errors = {};
    if (!name.trim()) e.name = "Enter your full name";
    if (!email.trim()) e.email = "Enter your email address";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email, like name@example.com";
    if (!program) e.program = "Select a program";

    setErrors(e);
    setSubmitted(Object.keys(e).length === 0);
  }

  function handleReset() {
    setName("");
    setEmail("");
    setProgram("");
    setContact("email");
    setAgree(false);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <GoabOneColumnLayout>
      <header>
  <GoabAppHeader
    heading="My Application"
    url="/"
    utilities={
      <>
        <GoabButton type="tertiary" size="compact">
          Help
        </GoabButton>
        <GoabButton type="tertiary" size="compact" leadingIcon="person">
          Sign in
        </GoabButton>
      </>
    }
  />
</header>

      <GoabPageBlock width="704px">
        <h1>Register for a program</h1>
        <p>Fill in your details and we'll get back to you.</p>

        {submitted && (
          <GoabCallout type="success" heading="Thanks, you're registered!" mb="l">
            We'll contact you by {contact === "email" ? "email" : "phone"} soon.
          </GoabCallout>
        )}

        <GoabFormItem label="Full name" requirement="required" error={errors.name} mb="l">
          <GoabInput
            name="name"
            value={name}
            error={!!errors.name}
            width="100%"
            onChange={(detail) => setName(detail.value)}
          />
        </GoabFormItem>

        <GoabFormItem
          label="Email address"
          requirement="required"
          helpText="We'll only use this to contact you about your registration."
          error={errors.email}
          mb="l"
        >
          <GoabInput
            name="email"
            type="email"
            value={email}
            error={!!errors.email}
            width="100%"
            onChange={(detail) => setEmail(detail.value)}
          />
        </GoabFormItem>

        <GoabFormItem label="Program" requirement="required" error={errors.program} mb="l">
          <GoabDropdown
            name="program"
            value={program}
            error={!!errors.program}
            placeholder="Select a program"
            onChange={(detail) => setProgram(detail.value ?? "")}
          >
            <GoabDropdownItem value="childcare" label="Child care subsidy" />
            <GoabDropdownItem value="training" label="Skills training" />
            <GoabDropdownItem value="housing" label="Housing support" />
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="How should we contact you?" mb="l">
          <GoabRadioGroup
            name="contact"
            value={contact}
            onChange={(detail) => setContact(detail.value)}
          >
            <GoabRadioItem value="email" label="Email" />
            <GoabRadioItem value="phone" label="Phone" />
          </GoabRadioGroup>
        </GoabFormItem>

        <GoabFormItem label="Updates" mb="xl">
          <GoabCheckbox
            name="updates"
            checked={agree}
            text="Send me updates about new programs"
            onChange={(detail) => setAgree(detail.checked)}
          />
        </GoabFormItem>

        <GoabButtonGroup alignment="start">
          <GoabButton type="primary" onClick={handleSubmit}>
            Submit
          </GoabButton>
          <GoabButton type="tertiary" onClick={handleReset}>
            Clear form
          </GoabButton>
        </GoabButtonGroup>
      </GoabPageBlock>

      <section slot="footer">
        <GoabAppFooter />
      </section>
    </GoabOneColumnLayout>
  );
}
