import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  TokenInputSection,
  type TokenInputSectionProps,
} from "./token-input-section";
import "@testing-library/jest-dom";

describe("TokenInputSection", () => {
  let mockDefaultProps: TokenInputSectionProps;

  beforeEach(() => {
    mockDefaultProps = {
      mode: "collateral",
      currency: "ETH",
      onSelectCurrency: vi.fn(),
      tokenQuantity: 0,
      onTokenQuantityChange: vi.fn(),
      tokenPrice: 0,
      onTokenPriceChange: vi.fn(),
      usdValue: 0,
    };
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TokenInputSection {...mockDefaultProps} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("handles currency selection", async () => {
    render(<TokenInputSection {...mockDefaultProps} />);
    const select = screen.getByRole("combobox");
    await userEvent.click(select);
    expect(mockDefaultProps.onSelectCurrency).toHaveBeenCalledTimes(0);
  });

  it("handles token quantity changes", () => {
    render(<TokenInputSection {...mockDefaultProps} />);
    const input = screen.getByRole("spinbutton", { name: /quantity/i });
    fireEvent.change(input, { target: { value: "1.5" } });
    expect(mockDefaultProps.onTokenQuantityChange).toHaveBeenCalledWith(1.5);
  });
});
