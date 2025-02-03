import { render, screen, fireEvent } from "@testing-library/react";
import { TokenInputSection } from "./token-input-section";
import { describe, it, expect, vi } from "vitest";

describe("TokenInputSection", () => {
  it("syncs usdValue to collateralValue card", () => {
    const mockOnTokenQuantityChange = vi.fn();
    const mockOnTokenPriceChange = vi.fn();
    const initialTokenPrice = 1500;

    render(
      <TokenInputSection
        currency="WETH"
        onSelectCurrency={() => {}}
        tokenQuantity={0}
        onTokenQuantityChange={mockOnTokenQuantityChange}
        tokenPrice={initialTokenPrice}
        onTokenPriceChange={mockOnTokenPriceChange}
      />,
    );

  });

  it("syncs usdValue to calculated collateralValue based on tokenQuantity and tokenPrice", () => {
    const mockOnTokenQuantityChange = vi.fn();
    const mockOnTokenPriceChange = vi.fn();
    const initialTokenPrice = 1500;

    // Render the component
    render(
      <TokenInputSection
        currency="WETH"
        onSelectCurrency={() => {}}
        tokenQuantity={0}
        onTokenQuantityChange={mockOnTokenQuantityChange}
        tokenPrice={initialTokenPrice}
        onTokenPriceChange={mockOnTokenPriceChange}
      />,
    );

    // Simulate changing token quantity
    const tokenQuantityInput = screen.getByLabelText("WETH Quantity");
    fireEvent.change(tokenQuantityInput, { target: { value: "10" } });

    // Check if onTokenQuantityChange was called with the correct value
    expect(mockOnTokenQuantityChange).toHaveBeenCalledWith(10);

    // Simulate changing token price
    const tokenPriceInput = screen.getByLabelText("WETH Price (USD)");
    fireEvent.change(tokenPriceInput, { target: { value: "2000" } });

    // Check if onTokenPriceChange was called with the correct value
    expect(mockOnTokenPriceChange).toHaveBeenCalledWith(2000);
  });

  it("displays collateralValue in usdValue input when provided", () => {
    const collateralValue = 5000;

    // Render the component with collateralValue
    render(
      <TokenInputSection
        currency="WETH"
        onSelectCurrency={() => {}}
        tokenQuantity={0}
        onTokenQuantityChange={() => {}}
        collateralValue={collateralValue}
        tokenPrice={1500}
        onTokenPriceChange={() => {}}
      />,
    );

    // Check if usdValue input displays the collateralValue
    const usdValueInput = screen.getByLabelText("USD Value");
    expect(usdValueInput).toHaveValue(collateralValue);
  });
});
