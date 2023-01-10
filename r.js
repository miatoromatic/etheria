const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
	name: 'r',
	aliases: ['roll'],
	description: 'Roll dice',
	execute(message, arguments, args, command) {
		var msg = message;
		var mobilefix = message.content.replace(/\u00A0/g, ' ');
		args = mobilefix.slice(prefix.length).trim().split(' ');
		command = args.shift().toLowerCase();

		var storycategory = "993010475350622268"
		var botcategory = "810332475208892436"
		var testchannel = "354439652515643392"
		var staffcategory = "986109926843764776"
		var namecheck = 0;
		var storycheck = 0;

		var responseperm = 0;

		if (message.channel.parentId === staffcategory || message.channel.parentId === botcategory || message.channelId === testchannel || message.channel.type === 'GUILD_PRIVATE_THREAD' || message.channel.type === 'GUILD_PUBLIC_THREAD') {
			responseperm = 1
		}

		if (message.channel.parentId === storycategory) {
			if (message.channel.name.includes("rolls")) {
				responseperm = 1
			} else {
				responseperm = 0
			}
		}

		if (responseperm === 0) {
			return;
		} else {

    if (!arguments.length) {
			message.reply('__ROLL CODES__\n**Basic**\n> Attack | `?r attack MR WR X # Mastery | Name | Code`\n> Recover | `?r recover # Mastery | Name | Code`\n\n**Offense**\n> Heavy Attack | `?r heavy MR WR X # Mastery | Name | Code`\n> Sneak Attack | `?r sneak MR WR X # Mastery | Name | Code`\n>  Attack | `?r reckless MR WR X # Mastery | Name | Code`\n> Burst Attack | `?r burst MR WR X # Mastery | Name | Code`\n> Feral Attack | `?r feral MR WR X # Mastery | Name | Code`\n> Critical Attack | `?r critical MR WR X # Mastery | Name | Code`\n\n**Defense**\n> stable Attack | `?r stable MR WR X # Mastery | Name | Code`\n> Counter | `?r counter MR WR X # Mastery | Name | Code`\n> Protect | `?r protect MR WR X # Mastery | Name | Code`\n> Hinder | `?r hinder MR WR X # Mastery | Name | Code`\n> Ultra Protect | `?r ultraprotect MR WR X # Mastery | Name | Code`\n> Ultra Hinder | `?r ultrahinder MR WR X # Mastery | Name | Code`\n\n**Support**\n> Revive | `?r revive MR # Mastery | Name | Code`\n> Heal | `?r heal MR WR X # Mastery | Name | Code`\n> Buff | `?r buff aoe/single MR WR X # Mastery | Name | Code`\n> Power Heal | `?r powerheal MR WR X # Mastery | Name | Code`\n> Power Buff | `?r powerbuff aoe/single MR WR X # Mastery | Name | Code`\n> Inspire | `?r inspire MR # Mastery | Name | Code`\n> Haste | `?r haste # Mastery | Name | Code`\n\n**Others**\n> Save | `?r save adv/dis X # Type | Name | Code`\n> Expertise Check | `?r expertise adv/dis X # Expertise | Name | Code`\n> Mastery Check | `?r mastery adv/dis MR # Mastery | Name | Code`\n\nREFERENCE\n`MR` = Mastery Rank (E to S). Required\n`WR` = Weapon Rank (E to S). Required\n`X` = All other numerical bonuses to the roll. Optional\n`aoe/single` = Required.\n`adv/dis` = Advantage or Disadvantage. Optional.\n`Comment` = Start a comment with `#`. Required').then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));;
    } else {
      function roll(min, max) {
				return Math.floor(Math.random() * (max - min + 1) ) + min;
			}

      //check for comment
      if (message.content.includes('#')) {
        var linebreak = "\n"
        var markup = "`"
        var c1 = linebreak.concat(markup)
				var c2 = c1.concat(message.content.substring(message.content.indexOf('#') + 1).trim());
        var comment = c2.concat(markup)
			} else {
				var comment = "";
			}

      //removes comment
      argu = args.join(" ");
      argu = argu.substr(0, argu.indexOf("#"))
      argu = argu.trim();
      arguments = argu.split(" ")

			//crits
			var crits = ""

      //normal roll
      if ((args[0].toString().includes("d") && args[0].toLowerCase() !== "hinder") && (args[0].toString().includes("d") && args[0].toLowerCase() !== "ultrahinder") && (args[0].toString().includes("d") && args[0].toLowerCase() !== "stable")) {
        var dicecode = args[0].split("d")
        var numDice = parseInt(dicecode[0])
        var dieFace = parseInt(dicecode[1])

				// Check if there are any modifiers specified
			  var modifier = 0;
			  var modifierString = "";
			  for (var i = 1; i < arguments.length; i++) {
			    if (!isNaN(arguments[i])) {
			      modifier += parseInt(arguments[i]);
			      if (modifierString === "") {
			        // Hide the plus sign if it is at the beginning of the string
			        modifierString += arguments[i];
			      } else {
			        modifierString += " + " + arguments[i];
			      }
			    }
			  }

				// Check if the user has specified advantage or disadvantage
				var advantage = false;
				var disadvantage = false;
				for (var i = 1; i < arguments.length; i++) {
				  if (arguments[i].toLowerCase() === "advantage") {
				    advantage = true;
				  } else if (arguments[i].toLowerCase() === "disadvantage") {
				    disadvantage = true;
				  }
				}

				if (advantage && disadvantage) {
				  message.reply("Error: You cannot specify both advantage and disadvantage in the same roll").then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				  return;
				}

				if (advantage || disadvantage) {
				  // Roll two dice and take the highest (advantage) or lowest (disadvantage) value
				  var roll1 = roll(1, dieFace);
				  var roll2 = roll(1, dieFace);
				  if (advantage) {
				    var finalRoll = Math.max(roll1, roll2);
				  } else {
				    var finalRoll = Math.min(roll1, roll2);
				  }
				  var rollString = "";
				  if (roll1 > roll2) {
				    rollString = `~~${roll2}~~ ${roll1}`;
				  } else {
				    rollString = `${roll1} ~~${roll2}~~`;
				  }

				  message.reply(`${message.author}\n**Roll Result**\n${numDice}d${dieFace} (${rollString}) ${modifierString} = **${finalRoll + modifier}**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				} else {
				  // Normal roll
				  var rollresults = []
				  var total = 0;

				  for (var i = 0; i < numDice; i++) {
				    var x = roll(1, dieFace)
				    total += x
				    rollresults.push(x)
				  }

				  // Add the modifier to the total
				  total += modifier;

				  var dicedisplay = rollresults.join(" + ")

				  if (comment.length < 3) {
				    message.reply(`${message.author} please include a comment in your roll`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				    return;
				  }

				  message.reply(`${message.author}\n**Roll Result**\n${numDice}d${dieFace} (${dicedisplay}) ${modifierString} = **${total}**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				}
	      }  else {

					//mr and wr
					var mr = 0;
					var wr = 0;
					var countercheck = 0;
					var sneakcheck = 0;
					var ultracountercheck = 0;
					var burstm = 0;
					var burstw = 0;
					var critrange = 0;
					var bonusc = 0;

					if (args[0].toLowerCase() !== "recover" && args[0].toLowerCase() !== "haste" && args[0].toLowerCase() !== "save" && args[0].toLowerCase() !== "expertise" & args[0].toLowerCase() !== "mastery" && args[0].toLowerCase() !== "heal2" && args[0].toLowerCase() !== "powerheal2" && args[0].toLowerCase() !== "buff2" && args[0].toLowerCase() !== "powerbuff2") {

					if (arguments[1].toLowerCase() === "e") {
						mr = 0
						countercheck = 99
						ultracountercheck = 99
						sneakcheck = 80
						burstm = 0
						critrange = 100
						bonusc = 0
					} else if (arguments[1].toLowerCase() === "d") {
						mr = 5
						countercheck = 70
						ultracountercheck = 85
						sneakcheck = 70
						burstm = 1
						critrange = 97
						bonusc = 10
					} else if (arguments[1].toLowerCase() === "c") {
						mr = 10
						countercheck = 70
						ultracountercheck = 70
						sneakcheck = 60
						burstm = 2
						critrange = 94
						bonusc = 10
					} else if (arguments[1].toLowerCase() === "b") {
						mr = 15
						countercheck = 50
						ultracountercheck = 55
						sneakcheck = 50
						burstm = 3
						critrange = 91
						bonusc = 20
					} else if (arguments[1].toLowerCase() === "a") {
						mr = 20
						countercheck = 40
						ultracountercheck = 40
						sneakcheck = 40
						burstm = 4
						critrange = 88
						bonusc = 20
					} else if (arguments[1].toLowerCase() === "s") {
						mr = 25
						countercheck = 25
						ultracountercheck = 25
						sneakcheck = 25
						burstm = 5
						critrange = 85
						bonusc = 30
					} else {
						message.reply(`${message.author} please use a valid Mastery Rank (E to S)`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
						return;
					}
				}

				if (args[0].toLowerCase() !== "recover" && args[0].toLowerCase() !== "haste" && args[0].toLowerCase() !== "inspire" && args[0].toLowerCase() !== "revive" && args[0].toLowerCase() !== "save" && args[0].toLowerCase() !== "expertise" & args[0].toLowerCase() !== "mastery" && args[0].toLowerCase() !== "heal2" && args[0].toLowerCase() !== "powerheal2" && args[0].toLowerCase() !== "buff2" && args[0].toLowerCase() !== "powerbuff2" && args[0].toLowerCase() !== "burstatk") {

					if (arguments[2].toLowerCase() === "e") {
						wr = 0
						burstw = 0
					} else if (arguments[2].toLowerCase() === "d") {
						wr = 5
						burstw = 1
					} else if (arguments[2].toLowerCase() === "c") {
						wr = 10
						burstw = 2
					} else if (arguments[2].toLowerCase() === "b") {
						wr = 15
						burstw = 3
					} else if (arguments[2].toLowerCase() === "a") {
						wr = 20
						burstw = 4
					} else if (arguments[2].toLowerCase() === "s") {
						wr = 25
						burstw = 5
					} else {
						message.reply(`${message.author} please use a valid Weapon Rank (E to S)`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
						return;
					}
				}

				if (args[0].toLowerCase() === "heal2" || args[0].toLowerCase() === "buff2" || args[0].toLowerCase() === "powerheal2" || args[0].toLowerCase() === "powerbuff2") {
					if (arguments[2].toLowerCase() === "e") {
						mr = 0
					} else if (arguments[2].toLowerCase() === "d") {
						mr = 5
					} else if (arguments[2].toLowerCase() === "c") {
						mr = 10
					} else if (arguments[2].toLowerCase() === "b") {
						mr = 15
					} else if (arguments[2].toLowerCase() === "a") {
						mr = 20
					} else if (arguments[2].toLowerCase() === "s") {
						mr = 25
					} else {
						message.reply(`${message.author} please use a valid Mastery Rank (E to S)`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
						return;
					}
					if (arguments[3].toLowerCase() === "e") {
						wr = 0
					} else if (arguments[3].toLowerCase() === "d") {
						wr = 5
					} else if (arguments[3].toLowerCase() === "c") {
						wr = 10
					} else if (arguments[3].toLowerCase() === "b") {
						wr = 15
					} else if (arguments[3].toLowerCase() === "a") {
						wr = 20
					} else if (arguments[3].toLowerCase() === "s") {
						wr = 25
					} else {
						message.reply(`${message.author} please use a valid Weapon Rank (E to S)`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
						return;
					}
				}

          if (args[0].toLowerCase() === "attack" || args[0].toLowerCase() == "atk") {
            //normal attack

            var total = 0
            var roll1 = roll(1,100)
            var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

            var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

            total = roll1 + mr + wr + parseInt(modtotal)

            if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

            message.reply(`${message.author}\n**Normal Attack**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					}	else if (args[0].toLowerCase() === "watk") {
	            //wild attack

							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total = 0

							var mods = [];
	            var modtotal = 0;

							if (arguments.length > 3) {
	              for (var i = 3; i < arguments.length; i++) {
	                mods.push(arguments[i])
	                modtotal += parseInt(arguments[i])
	              }
	            }

							total = roll1 + roll2 + parseInt(modtotal)

							var modstring = mods.join(" + ")
	            var plus = " + "
	            if (!mods.length) {
	              var moddisplay = ""
	            } else {
	              var moddisplay = plus.concat(modstring)
	            }

							var critCount = 0;
							if(roll1 === 100) critCount++;
							if(roll2 === 100) critCount++;

							var failCount = 0;
							if(roll1 === 1) failCount++;
							if(roll2 === 1) failCount++;

							if (critCount === 2) {
									total = total*4;
									crits = " **(Starbreaker!)**";
							} else if (critCount === 1 && failCount === 1) {
									total = total*2;
									crits = " **(Quantum Crit!)**";
							} else if (critCount === 1) {
									total = total*2;
									crits = " **(Crit!)**";
							} else if (failCount === 1) {
									total = total/2;
									crits = " **(Critical Failure...)**";
							} else if (failCount === 2) {
									crits = " **(World Ender...)**";
							}

							var wildcomment = "\nNext cycle (-10) if you make a save roll."

							message.reply(`${message.author}\n**Wild Attack**\n2d100 (${roll1} + ${roll2})${moddisplay} = ${total}${crits}\n**${total} damage**${wildcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					}	else if (args[0].toLowerCase() === "watkex") {
		            //wild attack EX

								var roll1 = roll(1,100)
								var roll2 = roll(1,100)

								var total = 0

								var mods = [];
		            var modtotal = 0;

								if (arguments.length > 3) {
		              for (var i = 3; i < arguments.length; i++) {
		                mods.push(arguments[i])
		                modtotal += parseInt(arguments[i])
		              }
		            }

								total = roll1 + roll2 + wr + parseInt(modtotal)

								var modstring = mods.join(" + ")
		            var plus = " + "
		            if (!mods.length) {
		              var moddisplay = ""
		            } else {
		              var moddisplay = plus.concat(modstring)
		            }

								var critCount = 0;
								if(roll1 === 100) critCount++;
								if(roll2 === 100) critCount++;

								var failCount = 0;
								if(roll1 === 1) failCount++;
								if(roll2 === 1) failCount++;

								if (critCount === 2) {
										total = total*4;
										crits = " **(Starbreaker!)**";
								} else if (critCount === 1 && failCount === 1) {
										total = total*2;
										crits = " **(Quantum Crit!)**";
								} else if (critCount === 1) {
										total = total*2;
										crits = " **(Crit!)**";
								} else if (failCount === 1) {
										total = total/2;
										crits = " **(Critical Failure...)**";
								} else if (failCount === 2) {
										crits = " **(World Ender...)**";
								}

								var wildcomment = "\nNext cycle (-10) if you make a save roll."

								message.reply(`${message.author}\n**Wild Attack**\n2d100 (${roll1} + ${roll2}) + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${wildcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
          } else if (args[0].toLowerCase() === "recover") {
            //recover

            var total = 0
            var roll1 = roll(1,20)

            total += roll1

            message.reply(`${message.author}\n**Recover**\n1d20 (${roll1}) = ${total}\nRecover **${total} HP**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
          } else if (args[0].toLowerCase() === "counter") {
            //counter

            var total = 0
            var roll1 = roll(1,100)
            var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

            if (roll1 >= countercheck) {
              var countercomment = "\nCounter successful! 20 damage added. Take 10 less damage"
              mods.push(20)
              modtotal += 20
            } else {
              var countercomment = "\nCounter failed. No additional damage dealt and no damage reduction"
            }

            var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

            total = roll1 + mr + wr + parseInt(modtotal)

            if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

            message.reply(`${message.author}\n**Counter**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${countercomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "ultracounter") {
						//ultra counter

            var total = 0
            var roll1 = roll(1,100)
            var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

            if (roll1 >= ultracountercheck) {
              var ultracountercomment = "\nUltra Counter successful! 100 damage added. Take 20 less damage. Vulnerable State negated."
              mods.push(100)
              modtotal += 100
            } else {
              var ultracountercomment = "\nUltra Counter failed... 50 damage added. Take 10 less damage. You are Vulnerable."
							mods.push(50)
              modtotal += 50
            }

            var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

            total = roll1 + mr + wr + parseInt(modtotal)

            if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

            message.reply(`${message.author}\n**Ultra Counter**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${ultracountercomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
          } else if (args[0].toLowerCase() === "save") {
						//saves

						if (args[1].toLowerCase() === "adv") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 2) {
								for (var i = 2; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							} else {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)

							var rolltype = "2d100 (Advantage)"
						} else if (args[1].toLowerCase() === "dis") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 2) {
								for (var i = 2; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							} else {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)

							var rolltype = "2d100 (Disadvantage)"
						} else {
							var roll1 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 1) {
								for (var i = 1; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							if (roll1 === 100) {
								crits = " **(Critical Success!)**"
							} else if (roll1 === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = roll1 + parseInt(modtotal)
							var rolltype = "1d100"
							var rolldisplay = `${roll1}`
						}
						message.reply(`${message.author}\n**Save**\n${rolltype} (${rolldisplay})${moddisplay} = **${total}**${crits}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "expertise") {
						//TO DO expertise checks

						var multiplier = 1;

						if (args[1].toLowerCase() === "adv") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 2) {
								for (var i = 2; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							} else {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)
							total = total * multiplier

							var rolltype = "2d100 (Advantage)"
						} else if (args[1].toLowerCase() === "dis") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 2) {
								for (var i = 2; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							} else {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)
							total = total * multiplier

							var rolltype = "2d100 (Disadvantage)"
						} else {
							var roll1 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments.length > 1) {
								for (var i = 1; i < arguments.length; i++) {
									mods.push(arguments[i])
									modtotal += parseInt(arguments[i])
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							if (roll1 === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (roll1 === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = roll1 + parseInt(modtotal)
							total = total * multiplier
							var rolltype = "1d100"
							var rolldisplay = `${roll1}`
						}
						message.reply(`${message.author}\n**Expertise Check**\n${rolltype} (${rolldisplay})${moddisplay} = **${total}**${crits}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "mastery") {
						//TO DO mastery check

						var multiplier = 1

						if (args[1].toLowerCase() === "adv") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

              if (arguments[2].toLowerCase() === "e") {
						    mr = 0;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "d") {
						    mr = 5;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "c") {
						    mr = 10;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "b") {
						    mr = 15;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "a") {
						    mr = 20;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "s") {
						    mr = 25;
                mods.push(mr);
                modtotal += mr
					    }

              if (arguments.length > 3) {
								for (var i = 3; i < arguments.length; i++) {
									othermod = parseInt(arguments[i]);
	                mods.push(arguments[i]);
	                modtotal += othermod
								}
              }

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							} else {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)
							total = total * multiplier

							var rolltype = "2d100 (Advantage)"
						} else if (args[1].toLowerCase() === "dis") {
							var roll1 = roll(1,100)
							var roll2 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments[2].toLowerCase() === "e") {
						    mr = 0;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "d") {
						    mr = 5;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "c") {
						    mr = 10;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "b") {
						    mr = 15;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "a") {
						    mr = 20;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[2].toLowerCase() === "s") {
						    mr = 25;
                mods.push(mr);
                modtotal += mr
					    }

							if (arguments.length > 3) {
								for (var i = 3; i < arguments.length; i++) {
									othermod = parseInt(arguments[i]);
	                mods.push(arguments[i]);
	                modtotal += othermod
								}
              }

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							var rolladv
							var rolldisplay

							if (roll1 >= roll2) {
								rolladv = roll2
								rolldisplay = `~~${roll1}~~, ${roll2}`
							} else {
								rolladv = roll1
								rolldisplay = `${roll1}, ~~${roll2}~~`
							}

							if (rolladv === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (rolladv === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = rolladv + parseInt(modtotal)
							total = total * multiplier

							var rolltype = "2d100 (Disadvantage)"
						} else {
							var roll1 = roll(1,100)

							var total
							var mods = [];
							var modtotal = 0;

							if (arguments[1].toLowerCase() === "e") {
						    mr = 0;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[1].toLowerCase() === "d") {
						    mr = 5;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[1].toLowerCase() === "c") {
						    mr = 10;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[1].toLowerCase() === "b") {
						    mr = 15;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[1].toLowerCase() === "a") {
						    mr = 20;
                mods.push(mr);
                modtotal += mr
					    } else if (arguments[1].toLowerCase() === "s") {
						    mr = 25;
                mods.push(mr);
                modtotal += mr
					    }

							if (arguments.length > 2) {
								for (var i = 2; i < arguments.length; i++) {
									othermod = parseInt(arguments[i]);
									mods.push(arguments[i]);
									modtotal += othermod
								}
							}

							var modstring = mods.join(" + ")
							var plus = " + "
							if (!mods.length) {
								var moddisplay = ""
							} else {
								var moddisplay = plus.concat(modstring)
							}

							if (roll1 === 100) {
								crits = " **(Critical Success!)**"
								multiplier = 2
							} else if (roll1 === 1) {
								crits = " **(Critical Failure...)**"
							}

							total = roll1 + parseInt(modtotal)
							total = total * multiplier
							var rolltype = "1d100"
							var rolldisplay = `${roll1}`
						}
						message.reply(`${message.author}\n**Mastery Check**\n${rolltype} (${rolldisplay})${moddisplay} = **${total}**${crits}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "hinder") {
            //hinder

						var roll1 = roll(1,100)
						var total = 0

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						mods.push(10)
						modtotal += 10

						total = roll1 + mr + wr + parseInt(modtotal)

						if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Hinder**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} SP damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
          } else if (args[0].toLowerCase() === "ultrahinder") {
						//ultra hinder

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						mods.push(50)
						modtotal += 50

						total = roll1 + roll2 + mr + wr + parseInt(modtotal)

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*4;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var hindercomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Ultra Hinder**\n2d100 (${roll1} + ${roll2}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} SP damage**${hindercomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "protect") {
						//protect

						var roll1 = roll(1,100)

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + wr + parseInt(modtotal)

						if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var protectcomment = "\nGive 1 ally in your zone the Protected State"

						message.reply(`${message.author}\n**Protect**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${protectcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "ultraprotect") {
						//ultra protect

						var roll1 = roll(1,100)
					  var roll2 = roll(1,100)

					  var total = 0

					  var mods = [];
					  var modtotal = 0;

					  if (arguments.length > 3) {
					    for (var i = 3; i < arguments.length; i++) {
					      mods.push(arguments[i])
					      modtotal += parseInt(arguments[i])
					    }
					  }

					  total = roll1 + roll2 + mr + wr + parseInt(modtotal)

					  var modstring = mods.join(" + ")
					  var plus = " + "
					  if (!mods.length) {
					    var moddisplay = ""
					  } else {
					    var moddisplay = plus.concat(modstring)
					  }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*4;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var protectcomment = "\nGive 2 allies within range the Protected State. You are Vulnerable."

						message.reply(`${message.author}\n**Ultra Protect**\n2d100 (${roll1} + ${roll2}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${protectcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "sharp") {
						// SHARP ATTACK

						var roll1 = roll(1,100)

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + mr + wr + parseInt(modtotal)

						if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Sharp**\n1d100 (${roll1}) + ${mr} + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "sharpex") {
						//sharp

						var roll1 = roll(1,100)

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + wr + parseInt(modtotal) + (parseInt(modtotal)*0.25)

						var critCount = 0;
						if(roll1 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;

						if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						}

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var scaledMods = "( " + moddisplay + " ) * 0.25";

						message.reply(`${message.author}\n**Sharp EX**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} + [ ${scaledMods} ] = ${total}${crits}\n**${total} damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "stable") {
						//stable

						var x = 6
						var total = 0
						var stabledisplay = []
						var stablecount = 0;

						var mods = [];
            var modtotal = 0;

						for (var i = 0; i < x; i++) {
							var y = roll(1,20)
							total += y
							stabledisplay.push(y)
							if (y === 20) {
								x += 1
								stablecount += 1
							}
						}

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = total + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
						var stablestring = stabledisplay.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**stable Attack**\n6d20 exploding (${stablestring}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage (Explosions: ${stablecount})**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "heavy") {
						//heavy attack

						var roll1 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						mods.push(20)
						modtotal += 20

						total = roll1 + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						if (roll1 === 100) {
              total = total*2
              crits = " **(Crit!)**"
            } else if (roll1 === 1) {
              crits = " **(Critical Failure...)**"
            }

						var heavycomment = "\nYou cannot move this cycle"

						message.reply(`${message.author}\n**Heavy Attack**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${heavycomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "sneak") {
						//sneak attack

						var roll1 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						if (roll1 >= countercheck) {
							mods.push(40)
							modtotal += 40
							var sneakcomment = "\nSneak Attack successful! Extra damage added."
						} else {
							var sneakcomment = "\nSneak Attack unsuccessful..."
						}

						total = roll1 + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;

						if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						}

						message.reply(`${message.author}\n**Sneak Attack**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${sneakcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "sneakex") {
						//sneak attack ex

						var roll1 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						if (roll1 >= sneakcheck) {
							modtotal += 25 + wr
							var sneakmods = "** 25 + " + wr + "**"
							var sneaktotal = 25 + wr
							var sneakcomment = "\nSneak Attack successful. +" + sneaktotal + " extra damage!"
						} else {
							var sneakmods = ""
							var sneakcomment = "\nSneak Attack unsuccessful. No extra damage."
						}

						total = roll1 + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
						var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;

						if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						}

						message.reply(`${message.author}\n**Sneak Attack EX**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay}+${sneakmods} = ${total}${crits}\n**${total} damage**${sneakcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "reckless") {
						//reckless attack

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)
						var roll3 = roll(1,100)
						var roll4 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + roll2 + roll3 + roll4 + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;
						if(roll3 === 100) critCount++;
						if(roll4 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;
						if(roll3 === 1) failCount++;
						if(roll4 === 1) failCount++;

						if (critCount === 2) {
								total = total*7;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var recklesscomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Reckless Attack**\n4d100 (${roll1} + ${roll2} + ${roll3} + ${roll4}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${recklesscomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "recklessex") {
						//reckless attack EX

												var roll1 = roll(1,100)
												var roll2 = roll(1,100)
												var roll3 = roll(1,100)
												var roll4 = roll(1,100)

												var total = 0

												var mods = [];
						            var modtotal = 0;

												if (arguments.length > 3) {
						              for (var i = 3; i < arguments.length; i++) {
						                mods.push(arguments[i])
						                modtotal += parseInt(arguments[i])
						              }
						            }

												total = roll1 + roll2 + roll3 + roll4 + wr + parseInt(modtotal)

												var modstring = mods.join(" + ")
						            var plus = " + "
						            if (!mods.length) {
						              var moddisplay = ""
						            } else {
						              var moddisplay = plus.concat(modstring)
						            }

												var critCount = 0;
												if(roll1 === 100) critCount++;
												if(roll2 === 100) critCount++;
												if(roll3 === 100) critCount++;
												if(roll4 === 100) critCount++;

												var failCount = 0;
												if(roll1 === 1) failCount++;
												if(roll2 === 1) failCount++;
												if(roll3 === 1) failCount++;
												if(roll4 === 1) failCount++;

												if (critCount === 2) {
														total = total*7;
														crits = " **(Starbreaker!)**";
												} else if (critCount === 1 && failCount === 1) {
														total = total*2;
														crits = " **(Quantum Crit!)**";
												} else if (critCount === 1) {
														total = total*2;
														crits = " **(Crit!)**";
												} else if (failCount === 1) {
														total = total/2;
														crits = " **(Critical Failure...)**";
												} else if (failCount === 2) {
														crits = " **(World Ender...)**";
												}

												var recklesscomment = "\nYou are Vulnerable."

												message.reply(`${message.author}\n**Reckless Attack**\n4d100 (${roll1} + ${roll2} + ${roll3} + ${roll4}) + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${recklesscomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "multi") {
						//multi attack

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + roll2 + mr + mr + wr + wr + parseInt(modtotal) + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*4;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var multicomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Multi Attack**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} + 1d100 (${roll2}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${multicomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "multiex") {
						//multi attack EX

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var total = 0
						var submodtotal = parseInt(modtotal)*0.5

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + mr + parseInt(modtotal) + roll2 + ((wr + wr + parseInt(modtotal))*0.5)
						total = Math.ceil(total)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = "";
            } else {
              var moddisplay = plus.concat(modstring);
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*4;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var multicomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Multi Attack EX**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} + [ ( 1d100 (${roll2}) + ${mr} + ${wr}${moddisplay} ) * 0.5 ] = ${total}${crits}\n**${total} damage**${multicomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "multiex2") {
						//multi attack EX

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var total = 0
						var submodtotal = parseInt(modtotal)*0.5

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + wr + parseInt(modtotal) + roll2 + mr + wr + ((parseInt(modtotal))*0.5)
						total = Math.ceil(total)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = "";
            } else {
              var moddisplay = plus.concat(modstring);
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*4;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var multicomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Multi Attack 2**\n1d100 (${roll1}) + ${mr} + ${wr}${moddisplay} +  1d100 (${roll2}) + ${mr} + ${wr} [ (${moddisplay} ) * 0.5 ] = ${total}${crits}\n**${total} damage**${multicomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "critical") {
						//critical attack

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						var rollfirst
						var rolladv
						var rollsecond

						if (roll1 >= roll2) {
							rolladv = roll1
							rollfirst = roll1
							rollsecond = "~~" + roll2.toString() + "~~"
						} else {
							rolladv = roll2
							rollfirst = "~~" + roll1.toString() + "~~"
							rollsecond = roll2
						}

						total = rolladv + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						if (rolladv >= critrange) {
							total = total*3
							crits = " **(Crit!)**"
						} else if (roll1 === 1 || roll2 === 1) {
							crits = " **(Critical Failure...)**"
						}

						var critcomment = "\nYou are Vulnerable."

						message.reply(`${message.author}\n**Critical Attack**\n2d100 (Advantage) (${rollfirst}, ${rollsecond}) + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${critcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "critical2") {
						//critical attack ADV

						var roll1 = roll(1,100)
					  var roll2 = roll(1,100)
					  var roll3 = roll(1,100)
					  var rolls = [roll1, roll2, roll3];
					  rolls.sort(function(a, b) { return b - a }); // sort rolls in descending order
					  var highestRoll = rolls[0]; // keep the highest roll

					  var mods = [];
					  var modtotal = 0;

					  if (arguments.length > 3) {
					    for (var i = 3; i < arguments.length; i++) {
					      mods.push(arguments[i])
					      modtotal += parseInt(arguments[i])
					    }
					  }

					  total = highestRoll + mr + mr + wr + parseInt(modtotal)

					  var modstring = mods.join(" + ")
					  var plus = " + "
					  if (!mods.length) {
					    var moddisplay = ""
					  } else {
					    var moddisplay = plus.concat(modstring)
					  }

					  if (highestRoll >= critrange) {
					    total = total * 3;
					    crits = " **(Crit!)**";
					  } else if (highestRoll === 1) {
					    crits = " **(Critical Failure...)**";
					  }

					  var critcomment = "\nYou are Vulnerable.";

					  // Display the rolls and strike out the two lowest rolls
						var rollString;
						if (roll1 > roll2 && roll1 > roll3) {
						  rollString = `3d100kh1 (${roll1}, ~~${roll2}~~, ~~${roll3}~~)`;
						} else if (roll2 > roll1 && roll2 > roll3) {
						  rollString = `3d100kh1 (~~${roll1}~~, ${roll2}, ~~${roll3}~~)`;
						} else {
						  rollString = `3d100kh1 (~~${roll1}~~, ~~${roll2}~~, ${roll3})`;
						}

						if (roll1 == roll2 || roll1 == roll3) {
						  rollString = `3d100kh1 (${roll1}, ~~${roll2}~~, ~~${roll3}~~)`;
						} else if (roll2 == roll1 || roll2 == roll3) {
						  rollString = `3d100kh1 (~~${roll1}~~, ~~${roll2}~~, ~~${roll3}~~)`;
						}

					  message.reply(`${message.author}\n**Extra Critical**\n${rollString} + ${mr} + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

					} else if (args[0].toLowerCase() === "critical3") {
						//critical attack

						var roll1 = roll(1,100)

						var mods = [];
            var modtotal = 0;

            if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + mr + wr + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						if (roll1 >= critrange) {
							total = total * 3;
							crits = " **(Crit!)**";
						} else if (roll1 === 1) {
							crits = " **(Critical Failure...)**";
						}

						var critcomment = "\nYou are Vulnerable.";

						message.reply(`${message.author}\n**Extra Critical**\n1d100 (${roll1}) + ${mr} + ${mr} + ${wr}${moddisplay} = ${total}${crits}\n**${total} damage**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "burst") {
						//burst attack

						var x = 10 + burstm + burstw
						var z = 10 + burstm + burstw
						var total = 0
						var burstdisplay = []
						var burstcount = 0;

						var mods = [];
            var modtotal = 0;

						for (var i = 0; i < x; i++) {
							var y = roll(1,20)
							total += y
							burstdisplay.push(y)
							if (y === 20) {
								x += 1
								burstcount = x - z;
							}
							if (x === 50) {
								break;
							}
						}

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = total + parseInt(modtotal)

						var burstcomment = `\nYou are Vulnerable.`

						var modstring = mods.join(" + ")
						var burststring = burstdisplay.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Burst Attack**\n${z}d20 (${burststring})${moddisplay} = ${total}${crits}\n**${total} damage (${burstcount} explosions)**${burstcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "burstex") {
						//burst attack

						var x = 10 + burstm + burstw
						var z = 10 + burstm + burstw
						var total = 0
						var burstdisplay = []
						var burstcount = 0;

						var mods = [];
            var modtotal = 0;

						for (var i = 0; i < x; i++) {
							var y = roll(1,20)
							total += y
							burstdisplay.push(y)
							if (y >= 19) {
								x += 1
								burstcount = x - z;
							}
							if (x === 50) {
								break;
							}
						}

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = total + parseInt(modtotal)

						var burstcomment = `\nYou are Vulnerable.`

						var modstring = mods.join(" + ")
						var burststring = burstdisplay.map(number => number >= 19 ? "**__" + number + "__**" : number).join(" + ");
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Burst Attack**\n${z}d20 (${burststring})${moddisplay} = ${total}${crits}\n**${total} damage (${burstcount} explosions)**${burstcomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "inspire") {
						//inspire

						var x = burstm + 1

						var total = 0
						var inspiredisplay = []

						var mods = [];
            var modtotal = 0;

						for (var i = 0; i < x; i++) {
							var y = roll(1,6)
							total += y
							inspiredisplay.push(y)
						}

						if (arguments.length > 2) {
              for (var i = 2; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = total + parseInt(modtotal)

						var modstring = mods.join(" + ")
						var inspirestring = inspiredisplay.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Inspire**\n${x}d6 (${inspirestring})${moddisplay} = ${total}${crits}\n**+${total} to 3 targets' checks**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "haste") {
						//haste

						var roll1 = roll(1,6)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 2) {
              for (var i = 2; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						message.reply(`${message.author}\n**Haste**\n1d6 (${roll1})${moddisplay} = ${total}${crits}\n**+${total} movement split in any way up to 3 allies**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "revive") {
						var x = burstm + 1
						var rezcount = 1

						var rezdisplay = []

						for (var i = 0; i < x; i++) {
							var y = roll(1,20)
							rezdisplay.push(y)
							if (y === 20) {
								rezcount += 1
							}
						}

						var moddisplay = ""

						var rezstring = rezdisplay.join(", ")

						message.reply(`${message.author}\n**Revive**\n${x}d20 (${rezstring})${moddisplay}\n**Revive ${rezcount} target(s)**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "heal") {
						//HEAL

					  x = 2;
					  total = 0;
					  stabledisplay = [];
					  stablecount = 0;

					  mods = [];
					  modtotal = 0;

					  for (var i = 0; i < x; i++) {
					    y = roll(1,20);
					    total += y;
					    stabledisplay.push(y);
					    if (y === 20) {
					      x += 1;
					      stablecount += 1;
					    }
					  }

					  if (arguments.length > 3) {
					    for (var i = 3; i < arguments.length; i++) {
					      mods.push(arguments[i]);
					      modtotal += parseInt(arguments[i]);
					    }
					  }

					  total = total + mr + wr + parseInt(modtotal);

					  modstring = mods.join(" + ");
					  stablestring = stabledisplay.join(" + ");
					  plus = " + ";
					  if (!mods.length) {
					    moddisplay = "";
					  } else {
					    moddisplay = plus.concat(modstring);
					  }

						// Divide total by 3 and round up the result
					  const dividedTotal = Math.ceil(total / 3);

						// Check for the presence of "aoe" in the command
					   const aoePresent = args.some(arg => arg.toLowerCase() === "aoe");
					   let aoeMessage = "";
					   if (aoePresent) {
							 aoeMessage = total + " / 3" + " (" + stablecount + " explosions)" + "\n**+" + dividedTotal + " HP to 3 targets**";
							 typeMessage = "AoE ";
					   }

					   let totalMessage = `${total}${crits}`;
					   if (aoePresent) {
					     totalMessage = "";
					   } else {
					     totalMessage = total + " (" + stablecount + " explosions)" + "\n**+" + total + " HP to 1 target**";
							 typeMessage = "";
						 }

					   message.reply(`${message.author}\n**${typeMessage}Heal**\n2d20 (${stablestring}) + ${mr} + ${wr}${moddisplay} = ${totalMessage}${aoeMessage}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "reflect") {
						//reflect



					} else if (args[0].toLowerCase() === "buff") {
						// BUFF ACTION

						var roll1 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + mr + wr + 25 + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;

						if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						}

						// Divide total by 3 and round up the result
				    const dividedTotal = Math.ceil(total / 3);

				    // Check for the presence of "aoe" in the command
				     const aoePresent = args.some(arg => arg.toLowerCase() === "aoe");
				     let aoeMessage = "";
				     if (aoePresent) {
				       aoeMessage = total + " / 3" + "\n**+" + dividedTotal + " extra damage to 3 targets for 1 attack**";
				       typeMessage = "AoE ";
				     }

				     let totalMessage = `${total}${crits}`;
				     if (aoePresent) {
				       totalMessage = "";
				     } else {
				       totalMessage = total + " / 3" + "\n**+" + dividedTotal + " extra damage to 1 target for 3 attacks**";
				       typeMessage = "";
				     }

						message.reply(`${message.author}\n**${typeMessage}Buff**\n1d100 (${roll1}) + [25] + ${mr} + ${wr}${moddisplay} = ${totalMessage}${aoeMessage}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

					} else if (args[0].toLowerCase() === "powerheal") {
						//POWER HEAL

					  x = 4;
					  total = 0;
					  stabledisplay = [];
					  stablecount = 0;

					  mods = [];
					  modtotal = 0;

					  for (var i = 0; i < x; i++) {
					    y = roll(1,20);
					    total += y;
					    stabledisplay.push(y);
					    if (y === 20) {
					      x += 1;
					      stablecount += 1;
					    }
					  }

					  if (arguments.length > 3) {
					    for (var i = 3; i < arguments.length; i++) {
					      mods.push(arguments[i]);
					      modtotal += parseInt(arguments[i]);
					    }
					  }

					  total = total + mr + wr + parseInt(modtotal);

					  modstring = mods.join(" + ");
					  stablestring = stabledisplay.join(" + ");
					  plus = " + ";
					  if (!mods.length) {
					    moddisplay = "";
					  } else {
					    moddisplay = plus.concat(modstring);
					  }

						// Divide total by 3 and round up the result
					  const dividedTotal = Math.ceil(total / 3);

						// Check for the presence of "aoe" in the command
					   const aoePresent = args.some(arg => arg.toLowerCase() === "aoe");
					   let aoeMessage = "";
					   if (aoePresent) {
							 aoeMessage = total + " / 3" + " (" + stablecount + " explosions)" + "\n**+" + dividedTotal + " HP to 3 targets**";
							 typeMessage = "AoE ";
					   }

					   let totalMessage = `${total}${crits}`;
					   if (aoePresent) {
					     totalMessage = "";
					   } else {
					     totalMessage = total + " (" + stablecount + " explosions)" + "\n**+" + total + " HP to 1 target**";
							 typeMessage = "";
						 }

    		 		var vuln = "\nYou are Vulnerable."

					   message.reply(`${message.author}\n**${typeMessage}Power Heal**\n2d20 (${stablestring}) + ${mr} + ${wr}${moddisplay} = ${totalMessage}${aoeMessage}${vuln}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
					} else if (args[0].toLowerCase() === "powerbuff") {
						//TO DO power buff

						var roll1 = roll(1,100)
						var roll2 = roll(1,100)

						var total = 0

						var mods = [];
            var modtotal = 0;

						if (arguments.length > 3) {
              for (var i = 3; i < arguments.length; i++) {
                mods.push(arguments[i])
                modtotal += parseInt(arguments[i])
              }
            }

						total = roll1 + roll2 + mr + wr + 50 + parseInt(modtotal)

						var modstring = mods.join(" + ")
            var plus = " + "
            if (!mods.length) {
              var moddisplay = ""
            } else {
              var moddisplay = plus.concat(modstring)
            }

						var critCount = 0;
						if(roll1 === 100) critCount++;
						if(roll2 === 100) critCount++;

						var failCount = 0;
						if(roll1 === 1) failCount++;
						if(roll2 === 1) failCount++;

						if (critCount === 2) {
								total = total*7;
								crits = " **(Starbreaker!)**";
						} else if (critCount === 1 && failCount === 1) {
								total = total*2;
								crits = " **(Quantum Crit!)**";
						} else if (critCount === 1) {
								total = total*2;
								crits = " **(Crit!)**";
						} else if (failCount === 1) {
								total = total/2;
								crits = " **(Critical Failure...)**";
						} else if (failCount === 2) {
								crits = " **(World Ender...)**";
						}

						var recklesscomment = "\nYou are Vulnerable."

						// Divide total by 3 and round up the result
				    const dividedTotal = Math.ceil(total / 3);

				    // Check for the presence of "aoe" in the command
				     const aoePresent = args.some(arg => arg.toLowerCase() === "aoe");
				     let aoeMessage = "";
				     if (aoePresent) {
				       aoeMessage = total + " / 3" + "\n**+" + dividedTotal + " extra damage to 3 targets for 1 **";
				       typeMessage = "AoE ";
				     }

				     let totalMessage = `${total}${crits}`;
				     if (aoePresent) {
				       totalMessage = "";
				     } else {
				       totalMessage = total + " / 3" + "\n**+" + dividedTotal + " extra damage to 1 target for 3 attacks**";
				       typeMessage = "";
				     }

						message.reply(`${message.author}\n**${typeMessage}Power Buff**\n2d100 (${roll1} + ${roll2}) + [50] + ${mr} + ${wr}${moddisplay} = ${totalMessage}${aoeMessage}${recklesscomment}${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

				} else if (args[0].toLowerCase() === "alterhdr") {
					//A HINDER

					total = bonusc

					message.reply(`${message.author}\n**(BA) Alter Hinder** +${total} SP damage${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				} else if (args[0].toLowerCase() === "taunt") {
					//TAUNT

					var total = 0

					var mods = [];
					var modtotal = 0;

					if (arguments.length > 3) {
						for (var i = 3; i < arguments.length; i++) {
							mods.push(arguments[i])
							modtotal += parseInt(arguments[i])
						}
					}

					total = parseInt(modtotal) * 3

          var tauntcomment = "\nBA: ``?r bataunt S S DMG # CharacterName``"

					message.reply(`${message.author}\n**(F) Taunt**\n ${modtotal} * 3 = ${total}\n**Threat: ${total}**${comment}${tauntcomment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				} else if (args[0].toLowerCase() === "bataunt") {
					//A TAUNT

					var total = 0

					var mods = [];
					var modtotal = 0;

					if (arguments.length > 3) {
						for (var i = 3; i < arguments.length; i++) {
							mods.push(arguments[i])
							modtotal += parseInt(arguments[i])
						}
					}

					total = parseInt(modtotal) * 5

					message.reply(`${message.author}\n**(BA) Taunt**\n ${modtotal} * 5 = ${total}\n**Threat: ${total}**${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));
				} else if (args[0].toLowerCase() === "torment") {
					//F TORMENT

					total = bonus101520

					message.reply(`${message.author}\n**(F) Torment**\nDeal **${total} flat damage** to an adjacent enemy.${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

				} else if (args[0].toLowerCase() === "ultratorment") {
					//BA ULTRA TORMENT

					total = bonus101520 * 2

					message.reply(`${message.author}\n**(BA) Ultra Torment**\nDeal (${bonus101520} * 2) = **${total} flat damage** to an enemy adjacent to you.${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

				} else if (args[0].toLowerCase() === "areatorment") {
					//BA AREA TORMENT

					total = bonus101520

					message.reply(`${message.author}\n**(F) Torment**\nDeal **${total} flat damage** to all enemies adjacent to you.${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

				} else if (args[0].toLowerCase() === "bashield") {
					//BA SHIELD

					total = bonus51015

					message.reply(`${message.author}\n**(BA) Shield**\nMitigate **${total} damage** when you .${comment}`).then(setTimeout(() => { message.delete() }, 1500)).catch(err => console.log(err));

				}
        
//end here
				}
				}
      }
    }
  }
