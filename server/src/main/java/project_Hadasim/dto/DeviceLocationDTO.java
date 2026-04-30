
package project_Hadasim.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DeviceLocationDTO {

    @JsonProperty("ID")
    private String ID;

    @JsonProperty("Coordinates")
    private Coordinates coordinates;

    @JsonProperty("Time")
    private String time;

    @Data
    public static class Coordinates {
        @JsonProperty("Longitude")
        private Angle longitude;

        @JsonProperty("Latitude")
        private Angle latitude;
    }

    @Data
    public static class Angle {
        @JsonProperty("Degrees")
        private String degrees;

        @JsonProperty("Minutes")
        private String minutes;

        @JsonProperty("Seconds")
        private String seconds;
    }
}