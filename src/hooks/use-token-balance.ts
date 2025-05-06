import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';

// Token addresses
export const USDC_ADDRESS = '0x393a97054a7aBe77A4f07BB560064201E94a84DD';
export const IDRX_ADDRESS = '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661';

// Token decimals
const USDC_DECIMALS = 6;
const IDRX_DECIMALS = 2;

export type TokenType = 'USDC' | 'IDRX';

export function useTokenBalance(tokenType: TokenType, address?: `0x${string}`) {
  // Get token address based on type
  const tokenAddress = tokenType === 'USDC' ? USDC_ADDRESS : IDRX_ADDRESS;
  const decimals = tokenType === 'USDC' ? USDC_DECIMALS : IDRX_DECIMALS;

  // Use wagmi's useBalance hook to fetch the token balance
  const { data, isLoading, error, refetch } = useBalance({
    address,
    token: tokenAddress as `0x${string}`,
    chainId: undefined, // Let wagmi determine the chain
  });

  // Log for debugging
  if (tokenType === 'IDRX' && (error || !data)) {
    console.log(`IDRX Balance Error for ${address}:`, error);
    console.log('IDRX Token Address:', tokenAddress);
  }

  // Format the balance for display
  const formattedBalance = data
    ? Number.parseFloat(formatUnits(data.value, decimals)).toLocaleString('id-ID')
    : '0.00';

  return {
    balance: formattedBalance,
    rawBalance: data?.value,
    isLoading,
    error,
    refetch,
    tokenAddress, // Return the token address for debugging
  };
}
