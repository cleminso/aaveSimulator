import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  TokenInputSection,
  type TokenInputSectionProps,
} from "./token-input-section";
import "@testing-library/jest-dom";

const mockDefaultProps: TokenInputSectionProps = {
  currency: "ETH",
  onSelectCurrency: vi.fn(),
  tokenQuantity: 1.5,
  onTokenQuantityChange: vi.fn(),
  tokenPrice: 2000,
  onTokenPriceChange: vi.fn(),
  collateralValue: 3000,
  usdValue: 3000,
};

describe("TokenInputSection", () => {
  const mockDefaultProps: TokenInputSectionProps = {
    currency: "ETH",
    onSelectCurrency: vi.fn(),
    tokenQuantity: 1.5,
    onTokenQuantityChange: vi.fn(),
    tokenPrice: 2000,
    onTokenPriceChange: vi.fn(),
    collateralValue: 3000,
    usdValue: 3000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with initial props", () => {
    render(<TokenInputSection {...mockDefaultProps} />);

    // Find elements by their text content in labels
    expect(screen.getByText("ETH Quantity")).toBeInTheDocument();
    expect(screen.getByText("ETH Price (USD)")).toBeInTheDocument();
    expect(screen.getByText("USD Value")).toBeInTheDocument();
  });

  it("handles token quantity changes", async () => {
    const onTokenQuantityChange = vi.fn();

    render(
      <TokenInputSection
        {...mockDefaultProps}
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
        {...mockDefaultProps}
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
    render(<TokenInputSection {...mockDefaultProps} usdValue={usdValue} />);

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
        {...mockDefaultProps}
        onSelectCurrency={onSelectCurrency}
      />,
    );

    // Use findByTestId to wait for the button to appear
    const currencySelectorButton =
      await screen.findByTestId("currency-selector");

    // Click the button to open the popover
    await user.click(currencySelectorButton);

    // Wait for the "DAI" currency item to appear in the popover content
    await waitFor(async () => {
      const daiCurrencyItem = await screen.findByRole("option", {
        name: "DAI",
      });
      expect(daiCurrencyItem).toBeInTheDocument();

      // Click the "DAI" currency item
      await user.click(daiCurrencyItem);

      // Verify that onSelectCurrency was called with "DAI"
      expect(onSelectCurrency).toHaveBeenCalledWith("DAI");
    });
  });
  it("prevents negative token quantity input", async () => {
    const onTokenQuantityChange = vi.fn();
    render(
      <TokenInputSection
        {...mockDefaultProps}
        onTokenQuantityChange={onTokenQuantityChange}
      />,
    );

    const label = screen.getByText("ETH Quantity");
    const input = label.parentElement?.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "-1" } });
    expect(onTokenQuantityChange).not.toHaveBeenCalled();
  });

  it("calculates USD value correctly when changing quantity and price", async () => {
    const tokenQuantity = 2;
    const tokenPrice = 1500;
    const expectedUsdValue = tokenQuantity * tokenPrice;

    render(
      <TokenInputSection
        {...mockDefaultProps}
        tokenQuantity={tokenQuantity}
        tokenPrice={tokenPrice}
        usdValue={expectedUsdValue}
      />,
    );

    const usdValueLabel = screen.getByText("USD Value");
    const usdValueInput = usdValueLabel.parentElement?.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;
    expect(Number(usdValueInput.value)).toBe(expectedUsdValue);
  });
});
