using System;

namespace Happnin.Data.Tests
{
    public static class SampleData
    {
        public const string Kyle = "Kyle";
        public const string Smith = "Smith";
        public const string Email = "e@mail.com";
        public const string UserNameKyle = "KyleIZKewl";

        public static User UserKyle() => new User(Kyle, Smith);

        public const string Caleb = "Caleb";
        public const string Walsh = "Walsh";
        public const string CalebEmail = "Caleb@mail.com";
        public const string UserNameCaleb = "CalebIzKewl";

        public static User UserCaleb() => new User(Caleb, Walsh);

        public const string Street = "1234 street"; 
        public const string City = "Spokane";
        public const string State = "WA";
        public const string Country = "United States of America";
        public const string ZipCode = "99004";
        public const string Lat = "47.658779";
        public const string Lng = "-117.426048";

        public static Location Location1234Spokane() => new Location(Street, City, State, Country, ZipCode, Lat, Lng);

        public const string DifferentStreet = "3456 lane";
        public const string DifferentCity = "Spokane";

        public static Location Location3456Spokane() => new Location(DifferentStreet, DifferentCity, State, Country, ZipCode, Lat, Lng);

        public const string Party = "Party";
        public const string Description = "a party";
        public static DateTime EventTime = DateTime.Today;
        public static DateTime EndTime = DateTime.MaxValue;
        public const double Cost = 1.5;
        public const int AgeRestriction = 42;
        public static Category Category = new Category(CategoryTypes.Festival);
        public static Category SecondCategory = new Category(CategoryTypes.Comedy);

        public static Event EventParty() => 
            new Event(Party, Description, Category, EventTime, EndTime, Cost, AgeRestriction, UserKyle(), Location1234Spokane());

        public const string Festival = "Festival";
        public const string FestivalDescription = "a nice festival";
        public const double FestivalCost = 15.00;
        public const int AgeRestrictionFestival = 16;
        public static Event EventFestival() => 
            new Event(Festival, FestivalDescription, Category, EventTime, EndTime, FestivalCost, AgeRestrictionFestival, UserCaleb(), Location3456Spokane());
    }
}
