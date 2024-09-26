package com.moviesapp.backend.StripePayment;

import lombok.Data;

@Data
public class CreatePaymentResponse {
    private String clientSecret;
    private String dpmCheckerLink;

    public CreatePaymentResponse(String clientSecret, String transactionId) {
        this.clientSecret = clientSecret;
        this.dpmCheckerLink = "https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=" + transactionId;
    }
}
