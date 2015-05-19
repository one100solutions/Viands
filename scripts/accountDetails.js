var ogaraFoodCourtToken = "a1ea27e75bf0b2ce8b6d2dc24800ecb30f209262e1f5e25a11d1a65e9c29d46256b75be0d982d1c93632a4ca8fc7c8115593321f71eec2451172c4bedd33cfaf55115c3c9f3ef47000bf21276a69f659b0b17375e331d6be8b0c168ff529861c1e774b0d1ec74e5c9427341ef08ac39abb51686219c42ffc625c7ef9d1784da50b5a578c80696580bb1d75bc6439e899638c21100a41205f8e902f4773dbf86898de6be51c652d1d8a9c5874d5c7660bda258c358d9a882d628d1e6e32eb4e9743a3dd50a9c6dce6b5a8d6d4bb718c86de2848b1e1051e269108c9f27577cbcfc9e6ab04a0c3fe5f1e0528e95df0419adb8ddf3941ba6a269014363be652878d4902225b8316deb63861a8f62ef27ac5331d3eb7edad9dedbffd0ae8090e4af51da1db645bc4230f093672aa62bbc847b3be91090098e83e0888f696b24c81efe63985078aee9429906a4b8c0a5509cecd268a4f32bbc7139728e6387691b7821caac38cee9ccea338c33f1c0398229c1f71cbf2583159990489e19d415075a8775f0d623efdbb8e4df7c2e825232f746a1b1bc0b63b08f141935f697a07156d5cdb18b9eb7931f837d5f94682181cb13f6d78f6abd4f57018a0f842c71824334b0cb2c4736a6c8f307fe5aaf07d5cd32476e641d84067b8411e144708c68b6d477123e6f0ce2f9d46320ff6c77699c4d51eed0d455a116c4f532fb56f985c77";

var MailAccount = require('../lib/mailAccount');

//Get the account details from 29/04/2015 to 19/05/2015

var dateForAccount = {};

//For April
for (var i = 29; i < 31; i++) {
		dateForAccount.year = 2015;
		dateForAccount.month = 4;
		dateForAccount.day = i;
		
		MailAccount.mailInfo(ogaraFoodCourtToken, dateForAccount);
}

for (var i = 1; i < 20; i++) {
		dateForAccount.year = 2015;
		dateForAccount.month = 5;
		dateForAccount.day = i;
		
		MailAccount.mailInfo(ogaraFoodCourtToken, dateForAccount);
}

process.exit(0);