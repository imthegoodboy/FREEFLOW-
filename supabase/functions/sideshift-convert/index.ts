import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fromCurrency, toCurrency, amount, settleAddress } = await req.json();
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Get quote from SideShift API
    const quoteResponse = await fetch("https://sideshift.ai/api/v2/pair", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!quoteResponse.ok) {
      throw new Error("Failed to get conversion quote");
    }

    const quote = await quoteResponse.json();
    
    // Calculate estimated amount (simplified - in production, use actual SideShift quote endpoint)
    const estimatedAmount = amount * 1.5; // Placeholder calculation
    
    // Create shift order (simplified - in production, use SideShift's actual shift creation endpoint)
    const shiftId = `shift_${Date.now()}`;
    
    // Save to database
    const { error: dbError } = await supabase.from("shifts").insert({
      user_id: user.id,
      shift_id: shiftId,
      from_currency: fromCurrency,
      to_currency: toCurrency,
      from_amount: amount,
      to_amount: estimatedAmount,
      status: "pending",
      settle_address: settleAddress,
    });

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({
        shiftId,
        fromCurrency,
        toCurrency,
        fromAmount: amount,
        toAmount: estimatedAmount,
        status: "pending",
        message: "Conversion initiated successfully",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in sideshift-convert:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});