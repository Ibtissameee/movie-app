package com.moviesapp.backend.StripePayment;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class CreatePaymentItem {
    @SerializedName("id")
    private String id;

    @SerializedName("amount")
    private Long amount;


}
