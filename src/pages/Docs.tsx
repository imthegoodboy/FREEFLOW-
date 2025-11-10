import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { BookOpen, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Docs() {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiHelp = async () => {
    if (!aiQuestion.trim()) return;

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { prompt: aiQuestion },
      });

      if (error) throw error;
      setAiAnswer(data.response);
      toast.success("AI response generated!");
    } catch (error: any) {
      toast.error(error.message || "AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-black mb-2">Documentation</h1>
          <p className="text-muted-foreground mb-8">
            Complete guide to integrating FREEFLOW API with AI-powered assistance
          </p>

          {/* AI Help Section */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-black">AI Documentation Assistant</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Ask anything about FREEFLOW API and get instant, context-aware answers
            </p>
            <div className="space-y-4">
              <Textarea
                placeholder="e.g., How do I authenticate API requests? Show me a Python example."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleAiHelp}
                disabled={aiLoading || !aiQuestion.trim()}
                className="w-full"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Answer...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Help
                  </>
                )}
              </Button>
              {aiAnswer && (
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm font-bold mb-2 text-primary">AI Response:</p>
                  <div className="text-sm whitespace-pre-wrap">{aiAnswer}</div>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Sign up for a free account</li>
                  <li>Generate your API key from the <a href="/api-keys" className="text-primary hover:underline">API Keys page</a></li>
                  <li>Make your first API call (3 free calls included!)</li>
                </ol>
                <CodeBlock 
                  language="bash"
                  code={`curl -X POST https://api.freeflow.network/convert \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "from": "BTC",
  "to": "ETH",
  "amount": 0.1
}'`}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">JavaScript / TypeScript</h2>
              <CodeBlock
                language="javascript"
                code={`// Using Fetch API
const response = await fetch('https://api.freeflow.network/convert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'BTC',
    to: 'ETH',
    amount: 0.1
  })
});

const data = await response.json();
console.log(data);

// Using Axios
import axios from 'axios';

const { data } = await axios.post(
  'https://api.freeflow.network/convert',
  {
    from: 'BTC',
    to: 'ETH',
    amount: 0.1
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Python</h2>
              <CodeBlock
                language="python"
                code={`import requests
import json

# Basic example
response = requests.post(
    'https://api.freeflow.network/convert',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'from': 'BTC',
        'to': 'ETH',
        'amount': 0.1
    }
)

data = response.json()
print(json.dumps(data, indent=2))

# With error handling
try:
    response = requests.post(
        'https://api.freeflow.network/convert',
        headers={'Authorization': f'Bearer {API_KEY}'},
        json={'from': 'BTC', 'to': 'ETH', 'amount': 0.1},
        timeout=10
    )
    response.raise_for_status()
    result = response.json()
    print(f"Conversion successful: {result}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`}
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Rust</h2>
              <CodeBlock
                language="rust"
                code={`use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::error::Error;

#[derive(Serialize)]
struct ConvertRequest {
    from: String,
    to: String,
    amount: f64,
}

#[derive(Deserialize, Debug)]
struct ConvertResponse {
    shift_id: String,
    from_amount: f64,
    to_amount: f64,
    status: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    
    let request = ConvertRequest {
        from: "BTC".to_string(),
        to: "ETH".to_string(),
        amount: 0.1,
    };
    
    let response = client
        .post("https://api.freeflow.network/convert")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .json(&request)
        .send()
        .await?;
    
    let result: ConvertResponse = response.json().await?;
    println!("Conversion result: {:?}", result);
    
    Ok(())
}`}
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Go</h2>
              <CodeBlock
                language="go"
                code={`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type ConvertRequest struct {
    From   string  \`json:"from"\`
    To     string  \`json:"to"\`
    Amount float64 \`json:"amount"\`
}

type ConvertResponse struct {
    ShiftID    string  \`json:"shift_id"\`
    FromAmount float64 \`json:"from_amount"\`
    ToAmount   float64 \`json:"to_amount"\`
    Status     string  \`json:"status"\`
}

func main() {
    apiKey := "YOUR_API_KEY"
    
    request := ConvertRequest{
        From:   "BTC",
        To:     "ETH",
        Amount: 0.1,
    }
    
    jsonData, _ := json.Marshal(request)
    
    req, _ := http.NewRequest(
        "POST",
        "https://api.freeflow.network/convert",
        bytes.NewBuffer(jsonData),
    )
    
    req.Header.Set("Authorization", "Bearer "+apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    var result ConvertResponse
    json.Unmarshal(body, &result)
    
    fmt.Printf("Conversion result: %+v\\n", result)
}`}
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">PHP</h2>
              <CodeBlock
                language="php"
                code={`<?php

$apiKey = 'YOUR_API_KEY';

$data = [
    'from' => 'BTC',
    'to' => 'ETH',
    'amount' => 0.1
];

$options = [
    'http' => [
        'header'  => [
            "Content-Type: application/json",
            "Authorization: Bearer {$apiKey}"
        ],
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents(
    'https://api.freeflow.network/convert',
    false,
    $context
);

$response = json_decode($result, true);
print_r($response);

// Using cURL (recommended)
$ch = curl_init('https://api.freeflow.network/convert');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer {$apiKey}"
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
print_r($result);`}
              />
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
