package com.moviesapp.backend.StripePayment;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class CreatePayment {
    @SerializedName("items")
    private CreatePaymentItem[] items;
}
