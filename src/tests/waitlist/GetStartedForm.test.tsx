import { test } from "vitest";
// import GetStartedForm from '../../components/marketing/GetStartedForm'; // Ensure the correct path

test("renders GetStartedForm component", () => {
  const { container } = render(
    <div>
      <GetStartedForm />
    </div>,
  );
  expect(container).toMatchSnapshot();
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GetStartedForm from "@/components/marketing/GetStartedForm";

describe("GetStartedForm", () => {
  it("should render form fields", () => {
    render(<GetStartedForm />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join waitlist/i }),
    ).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<GetStartedForm />);

    const submitButton = screen.getByRole("button", { name: /join waitlist/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter a valid email address"),
    ).toBeInTheDocument();
  });

  it("should show success message after submission", async () => {
    render(<GetStartedForm />);

    await userEvent.type(screen.getByLabelText("Full Name"), "Test User");
    await userEvent.type(
      screen.getByLabelText("Email Address"),
      "test@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /join waitlist/i }),
    );

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
      expect(
        screen.getByText(/you are #\d+ on our waitlist/i),
      ).toBeInTheDocument();
    });
  });

  it("should handle submission errors", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GetStartedForm />);

    await userEvent.type(screen.getByLabelText("Full Name"), "Existing User");
    await userEvent.type(
      screen.getByLabelText("Email Address"),
      "existing@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /join waitlist/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/this email is already on the waitlist/i),
      ).toBeInTheDocument();
    });
  });
});

<div>
  <p>It&apos;s a great day!</p>
  <p>Don&apos;t miss out!</p>
  <p>Let&apos;s get started!</p>
</div>;
