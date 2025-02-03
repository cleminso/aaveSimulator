import { render, screen, fireEvent } from "@testing-library/react";
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
    const onTokenQuantityChange = vi.fn();

    render(
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

    // Directly set the value and dispatch the change event
    fireEvent.change(input, { target: { value: "2.5" } });

    expect(onTokenQuantityChange).toHaveBeenCalledWith(2.5);
  });

  it("handles token price changes", async () => {
    const onTokenPriceChange = vi.fn();

    render(
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

    // Directly set the value and dispatch the change event
    fireEvent.change(input, { target: { value: "2500" } });

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
    const onSelectCurrency = vi.fn();
    const user = userEvent.setup();

    render(
      <TokenInputSection
        {...defaultProps}
        onSelectCurrency={onSelectCurrency}
      />,
    );

    // Find the PopoverTrigger (button) using the data-testid
    const currencySelectorButton = screen.getByTestId("currency-selector");
    expect(currencySelectorButton).toBeInTheDocument();

    // Click the button to open the popover
    await user.click(currencySelectorButton);

    // Find the "DAI" currency item in the popover content and click it
    const daiCurrencyItem = screen.getByText("DAI");
    expect(daiCurrencyItem).toBeInTheDocument();
    await user.click(daiCurrencyItem);

    // Verify that onSelectCurrency was called with "DAI"
    expect(onSelectCurrency).toHaveBeenCalledWith("DAI");
  });
});
