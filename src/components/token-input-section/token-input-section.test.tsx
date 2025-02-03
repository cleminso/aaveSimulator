import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TokenInputSection } from "./token-input-section";
import "@testing-library/jest-dom";

describe("TokenInputSection", () => {
  const defaultProps = {
    currency: "ETH",
    onSelectCurrency: vi.fn(),
    tokenQuantity: 1.5,
    onTokenQuantityChange: vi.fn(),
    tokenPrice: 2000,
    onTokenPriceChange: vi.fn(),
  };

  it("renders with initial props", () => {
    render(<TokenInputSection {...defaultProps} />);

    // Find elements by their text content in labels
    expect(screen.getByText("ETH Quantity")).toBeInTheDocument();
    expect(screen.getByText("ETH Price (USD)")).toBeInTheDocument();
    expect(screen.getByText("USD Value")).toBeInTheDocument();
  });

  it("handles token quantity changes", async () => {
    const user = userEvent.setup();
    const onTokenQuantityChange = vi.fn();

    const { container } = render(
      <TokenInputSection
        {...defaultProps}
        onTokenQuantityChange={onTokenQuantityChange}
      />,
    );

    // Find the first number input following the ETH Quantity label
    const label = screen.getByText("ETH Quantity");
    const input = label.parentElement?.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    await user.clear(input);
    // Create a change event with the new value
    const changeEvent = new Event("change", { bubbles: true });
    Object.defineProperty(changeEvent, "target", { value: { value: "2.5" } });

    input.value = "2.5";
    input.dispatchEvent(changeEvent);
    expect(onTokenQuantityChange).toHaveBeenCalledWith(2.5);
  });

  it("handles token price changes", async () => {
    const user = userEvent.setup();
    const onTokenPriceChange = vi.fn();

    const { container } = render(
      <TokenInputSection
        {...defaultProps}
        onTokenPriceChange={onTokenPriceChange}
      />,
    );

    // Find the input following the Price label
    const label = screen.getByText("ETH Price (USD)");
    const input = label.parentElement?.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    await user.clear(input);
    // Create a change event with the new value
    const changeEvent = new Event("change", { bubbles: true });
    Object.defineProperty(changeEvent, "target", { value: { value: "2500" } });

    input.value = "2500";
    input.dispatchEvent(changeEvent);
    expect(onTokenPriceChange).toHaveBeenCalledWith(2500);
  });

  it("displays USD value correctly", () => {
    const usdValue = 3000;
    render(<TokenInputSection {...defaultProps} usdValue={usdValue} />);

    const label = screen.getByText("USD Value");
    const input = label.parentElement?.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input).toHaveValue(usdValue);
  });

  it("updates currency selector", async () => {
    const user = userEvent.setup();
    const onSelectCurrency = vi.fn();

    render(
      <TokenInputSection
        {...defaultProps}
        onSelectCurrency={onSelectCurrency}
      />,
    );

    // The CurrencySelector component should render a button
    const currencySelector = screen.getByRole("button");
    await user.click(currencySelector);

    expect(onSelectCurrency).toHaveBeenCalled();
  });
});
